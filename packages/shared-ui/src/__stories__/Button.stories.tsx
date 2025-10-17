import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    fullWidth: {
      control: 'boolean'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Continue'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancel'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Learn more'
  }
};
