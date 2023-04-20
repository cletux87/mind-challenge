import { Story } from '@storybook/react';
import { useEffect, useState } from 'react';

import TextFieldWithIcon from './TextFieldWithIcon';
import { TextFieldWithIconProps } from './types';

export default {
  title: 'TextFieldWithIcon',
  component: TextFieldWithIcon,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'error', 'success', 'info', 'warning'],
      control: { type: 'radio' },
    },
  },
};

const Template: Story<TextFieldWithIconProps> = (args) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <TextFieldWithIcon
      {...args}
      focused={args.focused ? args.focused : undefined}
      handleChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  label: 'Name',
  value: '',
  placeholder: 'Enter your name',
  handleChange: () => console.log('on change input'),
  handleClickOnIcon: () => alert('Click on icon'),
  icon: (
    <svg
      width={'30'}
      height={'30'}
      fill="white"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="VisibilityIcon"
    >
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
    </svg>
  ),
};
