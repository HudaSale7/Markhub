/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProject, updateProjectContent } from "./ProjectApi.js";
import "./Project.css";

import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { loader } from "@monaco-editor/react";

import Markdown from "./MarkDown.js";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { useTheme } from "../theme/theme-provider.js";

export const ProjectGraphQl = () => {
  const theme = useTheme();
  const { id } = useParams();
  const projectId = id ? +id : -1;
  const [loading, setLoading] = useState(true);

  const query = useQuery(["project", id], () => getProject(projectId));
  const queryClient = useQueryClient();
  const debouncedValue = useDebounce(
    query.data?.getProject.project.content,
    1000
  );

  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === "json") {
        return new jsonWorker();
      }
      if (label === "css" || label === "scss" || label === "less") {
        return new cssWorker();
      }
      if (label === "html" || label === "handlebars" || label === "razor") {
        return new htmlWorker();
      }
      if (label === "typescript" || label === "javascript") {
        return new tsWorker();
      }
      return new editorWorker();
    },
  };

  loader.config({ monaco });

  loader.init();

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
  });

  useEffect(() => {
    mutation.mutate({ id: projectId, content: debouncedValue });
  }, [debouncedValue]);

  let editorTheme = "";

  if (theme.theme === "dark") {
    editorTheme = "vs-dark";
  } else if (theme.theme === "light") {
    editorTheme = "vs-light";
  } else if (theme.theme === "system") {
    editorTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "vs-dark"
      : "vs-light";
  }

  return (
    <>
      {query.data && (
        <div
          className={`project ${
            theme.theme === "dark"
              ? "bg-neutral-900 border-neutral-900"
              : "  border-neutral-50"
          }`}
        >
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

          <div
            className={`markdown ${
              theme.theme === "dark"
                ? "bg-neutral-900 border-neutral-900"
                : "  border-neutral-50"
            }`}
          >
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
