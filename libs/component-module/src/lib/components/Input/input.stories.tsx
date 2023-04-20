import { Input as InputComponent } from './Input';

const Template = (args: { [key in string]: any }) => (
  <InputComponent {...args} />
);

export default {
  title: 'Input',
  component: InputComponent,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    type: {
      control: {
        type: 'select',
        options: ['text', 'password'],
      },
    },
    value: {
      control: 'text',
    },
  },
  parameters: {
    docs: {
      page: () => ({}),
    },
  },
};

export const Input = Template.bind({});
