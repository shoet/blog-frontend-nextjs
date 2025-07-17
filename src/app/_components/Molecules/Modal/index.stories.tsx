import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from '.'
import { useState } from 'react'

export default {
  title: 'Molecules/Modal',
  component: Modal,
} as Meta<typeof Modal>

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: { open: true },
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>open</button>
        <Modal open={open} >
          <div className="h-[200px] w-[300px] rounded-xl bg-white">
            <button type="button" onClick={() => setOpen(false)}>close</button>
          </div>
        </Modal>
      </>

    )
  }
}
