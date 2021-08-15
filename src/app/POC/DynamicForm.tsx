import React, { useState } from 'react';
import { PageSection, PageSectionVariants, FileUpload, FormGroup, Button } from '@patternfly/react-core';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import { Schema } from '@data-driven-forms/react-form-renderer/common-types';
import IsRequired from '@data-driven-forms/pf4-component-mapper/is-required';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/form-template';
import { DynamicFormRenderer } from './DynamicFormRenderer';
import { useSkillsQuery } from '@app/models';
import { Loading } from '@app/components';
import schemaJson from './employeeForm.json';

const FileUploadComponent = (props) => {
  const { input, meta, label, isRequired, validateOnMount, helperText, description, FormItemProps } =
    useFieldApi(props);

  return (
    <>
      <FormGroup
        label={label}
        meta={meta}
        validateOnMount={validateOnMount}
        helperText={helperText}
        description={description}
        FormItemProps={FormItemProps}
        isRequired={isRequired}
        hideLabel
      >
        {/* {isRequired ? <IsRequired>{label}</IsRequired> : label} */}
        <FileUpload id={input?.name} {...input} />
        {meta.error && meta?.touched && (
          <div>
            <span style={{ color: 'red' }}>{meta.error}</span>
          </div>
        )}
      </FormGroup>
    </>
  );
};

const fileSizeValidator = ({ maxSize }) => {
  return (value) => {
    if (value && value?.size > maxSize) {
      /**
       * Human readable message should be generated!
       */
      return `File is too large, maximum allowed size is ${maxSize} bytes. Current file has ${value.size} bytes`;
    }
  };
};

export const componentMapper = {
  'file-upload': FileUploadComponent,
};

const validatorMapper = {
  'file-size': fileSizeValidator,
};

const DynamicForm: React.FC = () => {
  const [state, setState] = useState();
  const [clearForm, setClearForm] = useState();
  const { loading, data } = useSkillsQuery();

  if (loading) {
    return <Loading />;
  }

  const onSubmit = (values) => {
    setState(values);
    setClearForm(null);
  };

  const skillOptions = data?.skill?.map((s) => ({ label: s.name, value: s.id }));

  const loadOptions = () => (_props, _field, formOptions) => ({ ..._props, options: skillOptions });

  const actionMapper = {
    loadOptions,
  };

  const storeSchema = localStorage.getItem('shareNworkSchema');
  const parseSchema = storeSchema && JSON.parse(storeSchema);

  let formSchema: Schema = parseSchema || schemaJson;

  return (
    <PageSection variant={PageSectionVariants.light} isFilled style={{ paddingLeft: '25%', paddingRight: '25%' }}>
      <DynamicFormRenderer
        onSubmit={onSubmit}
        schema={formSchema}
        actionMapper={actionMapper}
        componentMapper={componentMapper}
        validatorMapper={validatorMapper}
        FormTemplate={(props) => (
          <FormTemplate
            canReset
            showFormControls={true}
            submitLabel="Submit"
            // disableSubmit={['pristine', 'touched', 'submitting', 'invalid']}
            {...props}
          />
        )}
        clearedValue={null}
        clearOnUnmount={true}
      />
      <br />
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </PageSection>
  );
};

export default DynamicForm;
