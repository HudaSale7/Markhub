import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useTheme } from '../theme/theme-provider.js';
import '../Project/Project.css';
import Editor, { loader } from '@monaco-editor/react';
import Markdown from '../Project/MarkDown.jsx';
import { useEffect, useState } from 'react';

const Intro = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('/project');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('# Welcome to Markdown Playground!');
  loader.init().then((monaco) => {
    monaco.editor.defineTheme('myTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#030712',
        'editor.lineHighlightBackground': '#00000000',
        'editor.lineHighlightBorder': '#00000000',
      },
    });
  });
  let editorTheme = '';
  if (theme.theme === 'dark') {
    editorTheme = 'vs-dark';
  } else if (theme.theme === 'light') {
    editorTheme = 'vs-light';
  } else if (theme.theme === 'system') {
    editorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'vs-dark'
      : 'vs-light';
  }

  return (
    <>
      <div className='container flex flex-col items-center justify-center py-20'>
        <h1 className='text-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal leading-normal  '>
          Your Friendly Markdown Playground for Effortless Creativity!
        </h1>
        <p className='mt-6 text-center   text-gray-400'></p>
        <div className='flex'>
          <Button
            variant='secondary'
            className=' text-xl  mr-4'
            size='lg'
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </Button>
          <Button
            size='lg'
            className='text-xl'
            onClick={() => {
              navigate('/signUp');
            }}
          >
            Signup
          </Button>
        </div>
        <h3 className='text-center text-4xl  font-bold tracking-normal leading-normal my-10 '>
          Try it out!
        </h3>
        <div className='flex w-full'>
          <Editor
            value={value}
            onMount={() => setLoading(false)}
            onChange={(changedValue) =>
              setValue(changedValue ? changedValue : value)
            }
            height='100% !important'
            width='50%'
            defaultLanguage='markdown'
            options={{
              theme: editorTheme,
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

          <div className='markdown border-solid border-y border-r'>
            <Markdown value={value} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
