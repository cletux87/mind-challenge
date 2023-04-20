import { Logo as LogoComponent } from './Logo';

const Template = (args: { [key in string]: any }) => (
  <LogoComponent {...args} />
);

export default {
  title: 'Logo',
  component: LogoComponent,
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

export const Logo = Template.bind({});
