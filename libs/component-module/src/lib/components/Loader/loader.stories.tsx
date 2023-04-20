import { Loader as LoaderComponent } from './Loader';

const Template = (args: { [key in string]: any }) => (
  <LoaderComponent {...args} />
);

export default {
  title: 'Loader',
  component: LoaderComponent,
  argTypes: {},
  parameters: {
    docs: {
      page: () => ({}),
    },
  },
};

export const Loader = Template.bind({});
