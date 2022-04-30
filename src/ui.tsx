import {
  Box,
  NumberInput,
  Button,
  Group,
  Select,
  RadioGroup,
  Radio,
} from '@mantine/core';
import React, { FormEvent, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { CONTENT, generateRandomText } from './content';
import { MessageType, ParagraphLength, PluginMessage } from './model';

type Language = 'ko' | 'en';
interface FormValue {
  language: {
    value: 'ko' | 'en';
  };
  paragraphLength: {
    value: ParagraphLength;
  };
  paragraphs: {
    value: number;
  };
}

const SUBMIT_TYPE: Record<
  string,
  Exclude<MessageType, 'sync-storage-config-value'>
> = {
  CREATE: 'create-text',
  REPLACE: 'replace-text',
};

function App() {
  const [language, setLanguage] = useState<Language>('ko');
  const handleCreate = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const eventType: MessageType =
        (e.nativeEvent.submitter?.value as MessageType | undefined) ??
        'create-text';

      const formTarget = e.target as unknown as FormValue;
      const paragraphLength = formTarget.paragraphLength.value;

      const content = generateRandomText({
        paragraphCount: formTarget.paragraphs.value,
        baseSource: CONTENT[language],
        paragraphLength,
      });

      const pluginMessage: PluginMessage = {
        type: eventType,
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
        <Group spacing={18} direction="column">
          <Group spacing={12}>
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
            <RadioGroup
              name="paragraphLength"
              label="paragraph length"
              defaultValue="medium"
            >
              <Radio value="short">short</Radio>
              <Radio value="medium">medium</Radio>
              <Radio value="long">long</Radio>
            </RadioGroup>
            <NumberInput
              name="paragraphs"
              defaultValue={3}
              placeholder="Paragraphs"
              label="Number of Paragraphs"
            />
          </Group>
          <Group spacing={6}>
            <Button type="submit" value={SUBMIT_TYPE.CREATE}>
              Create
            </Button>
            <Button type="submit" value={SUBMIT_TYPE.REPLACE}>
              Replace
            </Button>
          </Group>
        </Group>
      </form>
    </Box>
  );
}

ReactDOM.render(<App />, document.getElementById('figma-react-template'));
