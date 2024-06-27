import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { withConsole } from "@storybook/addon-console";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [(storyFn, context) => withConsole()(storyFn)(context)],
};

export default preview;
