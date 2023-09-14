import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import "./Project.css";

const MarkDown = (props: { value: string; loading: boolean }) => {
  if (props.loading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div>
      <ReactMarkdown
        children={props.value}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <>
              <h2 {...props} className=" text-3xl" />
              <hr />
            </>
          ),
          h2: ({ ...props }) => (
            <>
              <h3 {...props} className=" text-2xl" />
              <hr />
            </>
          ),
          h3: ({ ...props }) => <h4 {...props} className=" text-xl" />,
          h4: ({ ...props }) => <h5 {...props} className="  text-base" />,
          h5: "h6",
          pre: ({ ...props }) => (
            <>
              <pre
                {...props}
                style={{
                  backgroundColor: "#61616129",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              />
            </>
          ),
          code: ({ children, ...props }) => (
            <>
              <code children={children} {...props} />
              <CopyToClipboard text={children.toString()}>
                <div className="copy">
                  <FontAwesomeIcon icon={faCopy} />
                </div>
              </CopyToClipboard>
            </>
          ),
        }}
      />
    </div>
  );
};

export default MarkDown;
