import React, { useState } from 'react';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import { Button, ButtonVariant } from '@patternfly/react-core';

const CodeEditorDemo = () => {
  const [schema, setSchema] = useState();

  const onChange = (value) => {
    setSchema(value);
  };

  const onSaveSchema = () => {
    if (schema) {
      localStorage['shareNworkSchema'] = schema;
    }
  };

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%', marginTop: '5%' }}>
      <CodeEditor
        code={schema}
        language={Language.json}
        isUploadEnabled
        isDownloadEnabled
        isCopyEnabled
        isLanguageLabelVisible
        height="600px"
        onChange={onChange}
        customControls={
          <Button variant={ButtonVariant.primary} onClick={onSaveSchema}>
            Save Schema
          </Button>
        }
      />
    </div>
  );
};

export { CodeEditorDemo };
