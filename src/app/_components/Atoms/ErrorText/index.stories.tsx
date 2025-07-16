
import type { Meta, StoryObj } from '@storybook/react'
import { ErrorText } from '.'

export default {
  title: 'Atoms/ErrorText',
  component: ErrorText,
  render: (args) => {
    return <ErrorText>ErrorText</ErrorText>
  }
} as Meta<typeof ErrorText>

type Story = StoryObj<typeof ErrorText>

export const Default: Story = {
  args: {
  }
}
