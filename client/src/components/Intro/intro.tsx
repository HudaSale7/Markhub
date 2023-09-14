import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useTheme } from "../theme/theme-provider.js";
import "../Project/Project.css";

import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { loader } from "@monaco-editor/react";

import Markdown from "../Project/MarkDown.jsx";
import { useEffect, useState } from "react";

const Intro = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/project");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("# Welcome to Markdown Playground!");

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
      <div className="container flex flex-col items-center justify-center py-20">
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal leading-normal  ">
          Your Friendly Markdown Playground for Effortless Creativity!
        </h1>
        <p className="mt-6 text-center   text-gray-400"></p>
        <div className="flex">
          <Button
            variant="secondary"
            className=" text-xl  mr-4"
            size="lg"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            size="lg"
            className="text-xl"
            onClick={() => {
              navigate("/signUp");
            }}
          >
            Signup
          </Button>
        </div>
        <div
          className={` mt-12 hidden rounded-lg border-[20px]   ${
            theme.theme === "dark"
              ? "bg-neutral-900 border-neutral-900"
              : "  border-neutral-50"
          } shadow-[0px_-24px_300px_0px_rgba(57,140,203,0.15)] transition hover:shadow-[0px_-24px_150px_0px_rgba(57,140,203,0.3)] md:block`}
        >
          <h3 className="text-center text-4xl  font-bold tracking-normal leading-normal my-5 ">
            Try it out!
          </h3>
          <div className="flex w-full">
            <Editor
              value={value}
              onMount={() => setLoading(false)}
              onChange={(changedValue) =>
                setValue(changedValue ? changedValue : value)
              }
              height="100% !important"
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

            <div className="markdown border-solid border-y border-r">
              <Markdown value={value} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
