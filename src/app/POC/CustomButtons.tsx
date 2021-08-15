import React from 'react';
import { ActionGroup, Button } from '@patternfly/react-core';
import FormSpy from '@data-driven-forms/react-form-renderer/form-spy';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/form-template';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

const CustomButtons = () => {
  const { onCancel } = useFormApi();

  return (
    <FormSpy
      subscription={{
        submitting: true,
        pristine: true,
        invalid: true,
        validating: true,
      }}
    >
      {({ pristine, invalid, validating, submitting }) => (
        <div className="pf-c-form">
          <ActionGroup className="pf-u-mt-0">
            <Button
              variant="primary"
              form="modal-form"
              type="submit"
              isDisabled={pristine || validating || submitting || invalid}
            >
              {intl.formatMessage({
                id: 'sources.submit',
                defaultMessage: 'Submit',
              })}
            </Button>
            <Button variant="link" onClick={onCancel} id="cancel-modal">
              {intl.formatMessage({
                id: 'sources.cancel',
                defaultMessage: 'Cancel',
              })}
            </Button>
          </ActionGroup>
        </div>
      )}
    </FormSpy>
  );
};

export { CustomButtons };
