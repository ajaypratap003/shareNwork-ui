import React, { Fragment } from 'react';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import FormBuilder from '@data-driven-forms/form-builder/form-builder';
import pf4ComponentMapper from '@data-driven-forms/pf4-component-mapper/component-mapper';

import {
  pickerMapper as pf4PickerMapper,
  propertiesMapper as pf4PropertiesMapper,
  builderMapper as pf4PBuilderMapper,
  BuilderTemplate,
} from '@data-driven-forms/form-builder/pf4-builder-mappers';

import {
  LABEL,
  HELPER_TEXT,
  PLACEHOLDER,
  INPUT_TYPE,
  IS_DISABLED,
  IS_READ_ONLY,
  OPTIONS,
  TODAY_BUTTON_LABEL,
  IS_CLEARABLE,
  CLOSE_ON_DAY_SELECT,
  SHOW_TODAY_BUTTON,
  MULTI_LINE_LABEL,
  TITLE,
  DESCRIPTION,
  HIDE_FIELD,
  LEFT_TITLE,
  RIGHT_TITLE,
  MOVE_LEFT_TITLE,
  MOVE_RIGHT_TITLE,
  MOVE_ALL_LEFT_TITLE,
  MOVE_ALL_RIGHT_TITLE,
  ALL_TO_LEFT,
  ALL_TO_RIGHT,
  NO_VALUE_TITLE,
  NO_OPTIONS_TITLE,
  FILTER_OPTIONS_TITLE,
  FILTER_VALUE_TITLE,
  FILTER_VALUE_TEXT,
  FILTER_OPTIONS_TEXT,
  CHECKBOX_VARIANT,
  STEP,
  MIN,
  MAX,
} from './field-properties';

const componentProperties = {
  [componentTypes.TEXT_FIELD]: {
    attributes: [LABEL, HELPER_TEXT, PLACEHOLDER, INPUT_TYPE, IS_DISABLED, IS_READ_ONLY, HIDE_FIELD],
  },
  [componentTypes.CHECKBOX]: {
    attributes: [LABEL, IS_DISABLED, OPTIONS, HIDE_FIELD],
  },
  [componentTypes.SELECT]: {
    attributes: [LABEL, OPTIONS, IS_DISABLED, PLACEHOLDER, HELPER_TEXT, HIDE_FIELD],
  },
  [componentTypes.DATE_PICKER]: {
    attributes: [LABEL, TODAY_BUTTON_LABEL, IS_CLEARABLE, CLOSE_ON_DAY_SELECT, SHOW_TODAY_BUTTON, HIDE_FIELD],
  },
  [componentTypes.PLAIN_TEXT]: { attributes: [MULTI_LINE_LABEL] },
  [componentTypes.RADIO]: { attributes: [LABEL, IS_DISABLED, OPTIONS, HIDE_FIELD] },
  [componentTypes.SWITCH]: {
    attributes: [LABEL, IS_READ_ONLY, IS_DISABLED, HIDE_FIELD],
  },
  [componentTypes.TEXTAREA]: {
    attributes: [LABEL, HELPER_TEXT, IS_READ_ONLY, IS_DISABLED, HIDE_FIELD],
  },
  [componentTypes.SUB_FORM]: {
    isContainer: true,
    attributes: [TITLE, DESCRIPTION],
  },
  [componentTypes.DUAL_LIST_SELECT]: {
    attributes: [
      LABEL,
      HELPER_TEXT,
      DESCRIPTION,
      OPTIONS,
      HIDE_FIELD,
      LEFT_TITLE,
      RIGHT_TITLE,
      MOVE_LEFT_TITLE,
      MOVE_RIGHT_TITLE,
      MOVE_ALL_LEFT_TITLE,
      MOVE_ALL_RIGHT_TITLE,
      ALL_TO_LEFT,
      ALL_TO_RIGHT,
      NO_VALUE_TITLE,
      NO_OPTIONS_TITLE,
      FILTER_OPTIONS_TITLE,
      FILTER_VALUE_TITLE,
      FILTER_VALUE_TEXT,
      FILTER_OPTIONS_TEXT,
      CHECKBOX_VARIANT,
    ],
  },
  [componentTypes.SLIDER]: {
    attributes: [LABEL, HELPER_TEXT, DESCRIPTION, HIDE_FIELD, MIN, MAX, STEP],
  },
};

const schema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'my-text-field',
      label: 'Something',
      initialValue: 'Foo',
      isRequired: true,
      hideField: true,
      validate: [
        {
          type: validatorTypes.REQUIRED,
          message: 'This field is required',
        },
        {
          type: validatorTypes.MIN_LENGTH,
          threshold: 7,
        },
        {
          type: validatorTypes.MAX_LENGTH,
          threshold: 10,
        },
      ],
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'my-number-field',
      label: 'Number field',
      dataType: 'integer',
      initialValue: 5,
      validate: [
        {
          type: validatorTypes.MAX_NUMBER_VALUE,
          value: 33,
        },
        {
          type: validatorTypes.MIN_NUMBER_VALUE,
          value: 14,
        },
      ],
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'pattern-field',
      label: 'Pattern field',
      validate: [
        {
          type: validatorTypes.PATTERN,
          pattern: /^Foo$/,
        },
      ],
    },
    {
      component: componentTypes.SELECT,
      label: 'Select',
      name: 'select',
      initialValue: '2',
      options: [
        {
          label: 'Option 1',
          value: '1',
        },
        {
          label: 'Option 2',
          value: '2',
        },
      ],
    },
  ],
};

const schemaTemplate = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'my-text-field',
      label: 'Something',
      isRequired: true,
      initialValue: 'Foo',
      validate: [
        {
          type: validatorTypes.REQUIRED,
          message: 'This field is required',
        },
        {
          type: validatorTypes.MIN_LENGTH,
          threshold: 5,
        },
        {
          type: validatorTypes.MAX_LENGTH,
          threshold: 10,
        },
      ],
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'my-number-field',
      label: 'Number field',
      type: 'number',
      dataType: 'integer',
      initialValue: 5,
      validate: [
        {
          type: validatorTypes.MAX_NUMBER_VALUE,
          value: 50,
        },
        {
          type: validatorTypes.MIN_NUMBER_VALUE,
          value: 14,
        },
      ],
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'pattern-field',
      label: 'Pattern field',
      validate: [
        {
          type: validatorTypes.PATTERN,
          pattern: /^Foo$/,
        },
      ],
    },
    {
      component: componentTypes.SELECT,
      label: 'Select',
      name: 'select',
      initialValue: '2',
      options: [
        {
          label: 'Option 1',
          value: '1',
        },
        {
          label: 'Option 2',
          value: '2',
        },
        {
          label: 'Option 3',
          value: '3',
        },
      ],
    },
  ],
};

const FormBuilderDemo: React.FC = () => {
  return (
    <Fragment>
      <FormBuilder
        schema={schema}
        schemaTemplate={schemaTemplate}
        pickerMapper={pf4PickerMapper}
        componentProperties={componentProperties}
        builderMapper={pf4PBuilderMapper}
        propertiesMapper={pf4PropertiesMapper}
        componentMapper={pf4ComponentMapper}
        cloneWhileDragging
        disableDrag={false}
        disableAdd={false}
        openEditor
        mode="subset"
        debug={false}
        render={({ isValid, getSchema, ...props }) => (
          <BuilderTemplate {...props}>
            <div>
              <button onClick={() => console.log(getSchema())}>Click to get state</button>
            </div>
          </BuilderTemplate>
        )}
      />
    </Fragment>
  );
};

export default FormBuilderDemo;
