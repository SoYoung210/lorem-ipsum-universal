import { Box, NumberInput, Button, Group, Select } from '@mantine/core';
import React, { FormEvent, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { CONTENT, generateRandomText } from './content';
import { PluginMessage } from './model';

type Language = 'ko' | 'en';
interface FormValue {
  language: {
    value: 'ko' | 'en';
  };
  paragraphs: {
    value: number;
  };
}

function App() {
  const [language, setLanguage] = useState<Language>('ko');
  const handleCreate = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formTarget = e.target as unknown as FormValue;
      console.log('language', language);

      const content = generateRandomText({
        paragraphCount: formTarget.paragraphs.value,
        baseSource: CONTENT[language],
      });

      const pluginMessage: PluginMessage = {
        type: 'create-text',
        options: {
          content,
        },
      };
      parent.postMessage({ pluginMessage }, '*');
    },
    [language]
  );

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
            {/**
             * mantine does not support uncontrolled
             * https://github.com/mantinedev/mantine/issues/1137
             */}
            <Select
              name="language"
              label="Language"
              placeholder="Pick one"
              value={language}
              data={[
                { value: 'ko', label: 'Korean' },
                { value: 'en', label: 'English' },
              ]}
              onChange={v => setLanguage(v as Language)}
            />
          </Group>
          <Button type="submit">Create</Button>
        </Group>
      </form>
    </Box>
  );
}

ReactDOM.render(<App />, document.getElementById('figma-react-template'));
