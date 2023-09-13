/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProject, updateProjectContent } from "./ProjectApi";
import "./Project.css";
import Editor, { loader } from "@monaco-editor/react";
import Markdown from "./MarkDown.jsx";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { useTheme } from "../theme/theme-provider.js";

const Project = () => {
  const theme = useTheme();
  const { id } = useParams();
  const projectId = id ? +id : -1;
  const query = useQuery(["project", id], () => getProject(projectId));
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const debouncedValue = useDebounce(
    query.data?.getProject.project.content,
    1000
  );

  loader.init().then((monaco) => {
    monaco.editor.defineTheme("myTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#030712",
        "editor.lineHighlightBackground": "#00000000",
        "editor.lineHighlightBorder": "#00000000",
      },
    });
  });

  const handleEditorChange = (value: any) => {
    queryClient.setQueryData(["project", id], {
      getProject: {
        project: {
          content: value,
        },
      },
    });
  };

  const mutation = useMutation({
    mutationFn: updateProjectContent,
    onSuccess: () => {
      queryClient.invalidateQueries(["project", id]);
    },
  });

  useEffect(() => {
    console.log("debouncedValue", debouncedValue);
    mutation.mutate({ id: projectId, content: debouncedValue });
  }, [debouncedValue]);

  let editorTheme = "";

  if (theme.theme === "dark") {
    editorTheme = "myTheme";
  } else if (theme.theme === "light") {
    editorTheme = "vs-light";
  } else if (theme.theme === "system") {
    editorTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "myTheme"
      : "vs-light";
  }

  return (
    <>
      {query.data && (
        <div className="project">
          <Editor
            onMount={() => setLoading(false)}
            value={query.data.getProject.project.content}
            onChange={(value) => handleEditorChange(value)}
            height="calc(100vh - 4rem)"
            width="50%"
            defaultLanguage="markdown"
            options={{
              theme: editorTheme,
              wordWrap: "on",
              minimap: { enabled: false },
              showUnused: false,
              folding: false,
              lineNumbersMinChars: 3,
              fontSize: 16,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              scrollbar: {
                vertical: "visible",
                horizontal: "visible",
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
            }}
          />

          <div className="markdown">
            <Markdown
              value={query.data.getProject.project.content}
              loading={loading}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
