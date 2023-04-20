import { Spinner as SpinnerComponent } from './Spinner';

const Template = (args: { [key in string]: any }) => (
  <SpinnerComponent {...args} />
);

export default {
  title: 'Spinner',
  component: SpinnerComponent,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['default', 'sm', 'lg'],
      },
    },
  },
  parameters: {
    docs: {
      page: () => ({}),
    },
  },
};

export const Spinner = Template.bind({});
