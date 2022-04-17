import { Box } from '@mantine/core';
import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { PluginMessage } from './model';

function App() {
  const handleCreate = useCallback(() => {
    const pluginMessage: PluginMessage = {
      type: 'create-text',
      options: {
        content: 'Hello World',
      },
    };
    parent.postMessage({ pluginMessage }, '*');
  }, []);

  return (
    <Box sx={{ padding: '16px' }}>
      <div>hello world</div>
      <button onClick={handleCreate}>Create</button>
    </Box>
  );
}

ReactDOM.render(<App />, document.getElementById('figma-react-template'));
