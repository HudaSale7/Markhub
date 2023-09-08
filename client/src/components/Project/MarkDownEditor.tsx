import Editor from '@monaco-editor/react';

const MarkDownEditor = () => {
  return (
    <Editor
      onChange={(value) => console.log(value)}
      height='calc(100vh - 100px)'
      width='500px'
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
      }}
    />
  );
};

export default MarkDownEditor;
