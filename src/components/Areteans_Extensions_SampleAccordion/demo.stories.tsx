/* eslint-disable react/jsx-no-useless-fragment */
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';

import AreteansExtensionsSampleAccordion from './index';

import { configProps, operatorDetails } from './mock';

const meta: Meta<typeof AreteansExtensionsSampleAccordion> = {
  title: 'AreteansExtensionsSampleAccordion',
  component: AreteansExtensionsSampleAccordion,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof AreteansExtensionsSampleAccordion>;

if (!window.PCore) {
  window.PCore = {};
}

window.PCore.getLocaleUtils = () => {
  return {
    getLocaleValue: value => {
      return value;
    }
  };
};

window.PCore.getUserApi = () => {
  return {
    getOperatorDetails: () => {
      return new Promise(resolve => {
        resolve(operatorDetails);
      });
    }
  };
};

export const BaseAreteansExtensionsSampleAccordion: Story = args => {

  const props = {
    label: configProps.label,
    createOperator: configProps.createOperator,
    updateOperator: configProps.updateOperator,
    createDateTime: configProps.createDateTime,
    updateDateTime: configProps.updateDateTime,

    getPConnect: () => {
      return {
        getActionsApi: () => {
          return {
            updateFieldValue: () => {/* nothing */},
            triggerFieldChange: () => {/* nothing */}
          };
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    }
};

return (
    <>
      <AreteansExtensionsSampleAccordion {...props} {...args} />
    </>
  );
};

BaseAreteansExtensionsSampleAccordion.args = {
  createLabel: configProps.createLabel,
  updateLabel: configProps.updateLabel,
  hideLabel: configProps.hideLabel
};
