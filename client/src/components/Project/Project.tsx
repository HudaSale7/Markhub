/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProject } from './ProjectApi';
import './Project.css';
import Editor from '@monaco-editor/react';
import Markdown from './MarkDown.jsx';
import { useState } from 'react';

const Project = () => {
  const { id } = useParams();
  const query = useQuery(['project', id], () => getProject(id ? +id : -1));
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);

  const handleEditorChange = (value: any) => {
    queryClient.setQueryData(['project', id], {
      getProject: {
        project: {
          content: value,
        },
      },
    });
  };

  return (
    <>
      {query.data && (
        <div className='project'>
          <Editor
            onMount={() => setLoading(false)}
            value={query.data.getProject.project.content}
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
            <Markdown value={query.data.getProject.project.content} loading={ loading } />
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
