// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { getProject } from './ProjectApi';
import './Project.css';
import Editor from '@monaco-editor/react';
import Markdown from './MarkDown.jsx';
import { useState } from 'react';

const Project = () => {
  // const { id } = useParams();
  const [markdown, setMarkdown] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorChange = (value: any) => {
    setMarkdown(value);
  };
  return (
    <>
      <div className='project'>
        <Editor
          onChange={(value) => handleEditorChange(value)}
          height='calc(100vh - 50px)'
          width='50%'
          defaultLanguage='markdown'
          options={{
            wordWrap: 'on',
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
          }}
        />
        <div className='markdown'>
          <Markdown value={markdown} />
        </div>
      </div>
    </>
  );
};

export default Project;
