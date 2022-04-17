import { Box, NumberInput, Button, Group, Select } from '@mantine/core';
import React, { FormEvent, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { BASE_KO, generateRandomText } from './content';
import { PluginMessage } from './model';

interface FormValue {
  language: {
    value: 'ko' | 'en';
  };
  paragraphs: {
    value: number;
  };
}

function App() {
  const handleCreate = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formTarget = e.target as unknown as FormValue;
    const content = generateRandomText({
      paragraphCount: formTarget.paragraphs.value,
      baseSource: BASE_KO,
    });

    const pluginMessage: PluginMessage = {
      type: 'create-text',
      options: {
        content,
      },
    };
    parent.postMessage({ pluginMessage }, '*');
  }, []);

  return (
    <Box sx={{ padding: '16px' }}>
      <form onSubmit={handleCreate}>
        <Group spacing={8} direction="column">
          <Group spacing={6}>
            <NumberInput
              name="paragraphs"
              defaultValue={3}
              placeholder="Paragraphs"
              label="Number of Paragraphs"
              required
            />
            <Select
              name="language"
              label="Language"
              placeholder="Pick one"
              defaultValue="ko"
              data={[{ value: 'ko', label: 'Korean' }]}
            />
          </Group>
          <Button type="submit">Create</Button>
        </Group>
      </form>
    </Box>
  );
}

ReactDOM.render(<App />, document.getElementById('figma-react-template'));
