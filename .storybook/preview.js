import { customViewPorts } from "./customViewPorts";
import { darkTheme, lightTheme } from "./customTheme";
import { DocsContainer } from "./DocsContainer";

const order = [
    'intro-',
    'quick-start-',
    'guidelines-',
    'components-',
  ];
export const parameters = {
    "actions": { argTypesRegex: "^on[A-Z].*" },
    "controls": {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    "backgrounds": { disable: true },
    "darkMode": {
        "stylePreview": true,
        "light": lightTheme,
        "dark": darkTheme,
    },
    "viewport": {
        "viewports": customViewPorts,
    },
    "docs": {
        container: DocsContainer,
    },
    "options": {
        storySort: (a, b) => {
          const aName = a[0];
          const bName = b[0];
    
          if (aName.includes('documentation-') || bName.includes('documentation-')) {
            const aIdx = order.findIndex(i => aName.indexOf(i) > -1);
            const bIdx = order.findIndex(i => bName.indexOf(i) > -1);
            return aIdx - bIdx;
          }
    
          return aName < bName ? -1 : 1;
        }
      },
};
