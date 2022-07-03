import { customViewPorts } from "./customViewPorts";
import { darkTheme, lightTheme } from "./customTheme";
import { DocsContainer } from "./DocsContainer";

export const parameters = {
    "actions": { argTypesRegex: "^on[A-Z].*" },
    "controls": {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
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
};
