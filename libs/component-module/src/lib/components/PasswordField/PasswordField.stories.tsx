import { Story } from '@storybook/react';
import { useEffect, useState } from 'react';

import { PasswordField } from './PasswordField';
import { PasswordFieldProps } from './types';

export default {
  title: 'PasswordField',
  component: PasswordField,
  argTypes: {
    color: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    validate: {
      options: ['success', 'warning', 'error'],
      control: { type: 'radio' },
    },
  },
};

const Template: Story<PasswordFieldProps> = (args) => {
  const [value, setValue] = useState(args.value);

  const validate = () => ({
    color:
      typeof args.validate === 'string' ? args.validate : ('success' as const),
    message: 'Text',
  });

  useEffect(() => {
    setValue(args.value);
  }, [args.value, args.validate]);

  return (
    <PasswordField
      {...args}
      value={value}
      handleChange={(e) => setValue(e.target.value)}
      validate={validate}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  label: 'Password(min 8 chars)',
  value: '',
  validate: () => ({
    color: 'error',
    message: 'Password too short',
  }),
};
