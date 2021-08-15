import React from 'react';
import { Grid, GridItem } from '@patternfly/react-core';
import FormRenderer, { ActionMapper } from '@data-driven-forms/react-form-renderer/form-renderer';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/form-template';
import pf4ComponentMapper from '@data-driven-forms/pf4-component-mapper/component-mapper';
import { ComponentMapper, Field } from '@data-driven-forms/react-form-renderer/common-types';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

export type DynamicFormRendererProps = {
  componentMapper: ComponentMapper;
  actionMapper: ActionMapper;
};

const ColumnLayout = ({ fields, ...props }) => {
  const { renderForm } = useFormApi();
  const { size } = props;
  const columnSize: any = size && size <= 12 ? 12 / size : 12;

  return (
    <Grid hasGutter xl={columnSize}>
      {fields?.map((field: Field) => (
        <GridItem key={field.name}>{renderForm([field])}</GridItem>
      ))}
    </Grid>
  );
};

const mapperExtension = {
  'column-layout': ColumnLayout,
};

const DynamicFormRenderer: React.FC<any> = ({ componentMapper, actionMapper, ...props }) => {
  return (
    <FormRenderer
      FormTemplate={FormTemplate}
      componentMapper={{
        ...pf4ComponentMapper,
        ...mapperExtension,
        ...componentMapper,
      }}
      actionMapper={actionMapper}
      {...props}
    />
  );
};

export { DynamicFormRenderer };
