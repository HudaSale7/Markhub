/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";

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

import { useTheme } from "../theme/theme-provider.js";
import { Socket, io } from "socket.io-client";

type Project = {
  id: number;
  name: string;
  content: string;
};

let socket: Socket;

export const ProjectSocketIO = () => {
  const theme = useTheme();
  const { id } = useParams();
  const projectId = id ? +id : -1;
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project>({
    id: -1,
    name: "",
    content: "",
  });

  useEffect(() => {
    socket = io(`${import.meta.env.VITE_SOCKET}`, {
      extraHeaders: {
        token: localStorage.getItem("token") || "",
      },
      query: {
        projectId,
      },
    });

    socket.on("projectUpdate", (data: Project) => {
      setProject(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
    setProject({ ...project, content: value });
    socket.emit("projectUpdate", { ...project, content: value });
  };

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
      {project && (
        <div
          className={`project ${
            theme.theme === "dark"
              ? "bg-neutral-900 border-neutral-900"
              : "  border-neutral-50"
          }`}
        >
          <Editor
            onMount={() => setLoading(false)}
            value={project.content}
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
            <Markdown value={project.content} loading={loading} />
          </div>
        </div>
      )}
    </>
  );
};
