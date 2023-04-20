import React from 'react';
import { LetterAvatar } from './index';
import { Title, Subtitle, Description } from '@storybook/addon-docs/blocks';

export default {
  title: 'LetterAvatar',
  component: LetterAvatar,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'large'],
      },
      description: 'Defines avatar size',
    },
    color: {
      description: 'Custom underlay color',
      control: { type: 'color' },
    },
    disabled: {
      description: 'Disable button.',
      type: 'boolean',
    },
  },

  parameters: {
    docs: {
      page: () => (
        <>
          <Title>LetterAvatar</Title>
          <Description>Displays the LetterAvatar</Description>
          <br />
          <Subtitle>Behaviour</Subtitle>

          <Description>
            - firstName prop string. Component will extract the first letter and
            capitalize it.
          </Description>
          <Description>
            - lastName prop string. Component will extract the first letter and
            capitalize it.
          </Description>
          <Description>- onClick button action.</Description>
          <Description>- size prop for small and large.</Description>
          <Description>
            - color prop to set a custom color. Default is grey.
          </Description>
          <Description>
            - disabled prop for disabling button without mouse pointer and no
            style changes.
          </Description>
        </>
      ),
    },
  },
};

function avatarClick() {
  alert('AVATAR CLICKED');
}

const LetterAvatarTemplate = (args: { [key in string]: any }) => (
  <LetterAvatar
    {...args}
    onClick={() => avatarClick()}
    firstName="Station"
    lastName="Wise"
  />
);

export const LetterAvatarStory = LetterAvatarTemplate.bind({});
