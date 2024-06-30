import { Meta, StoryObj } from "@storybook/react";
import { Dropdown, DropdownOption } from ".";

export default {
  title: "Atoms/Dropdown",
  component: Dropdown,
} as Meta<typeof Dropdown>;

export type Story = StoryObj<typeof Dropdown>;

const exampleOptions: DropdownOption[] = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

export const Default: Story = {
  args: {
    options: exampleOptions,
    placeholder: "------ Select an option ------",
  },
  render: (args) => {
    const handleSubmit = (formData: FormData) => {
      const value = formData.get("dropdown_option");
      console.log(value);
    };
    return (
      <form action={handleSubmit}>
        <Dropdown name="dropdown_option" {...args} />
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    );
  },
};
