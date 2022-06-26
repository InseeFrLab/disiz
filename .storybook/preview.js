import { customViewPorts } from "./customViewPorts";
import { darkTheme, lightTheme } from "./customTheme";

export const parameters = {
    "actions": { argTypesRegex: "^on[A-Z].*" },
    "controls": {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    "darkMode": {
        "light": lightTheme,
        "dark": darkTheme,
    },
    "viewport": {
        "viewports": customViewPorts,
    },
    // "options": {
    //     "storySort": (a, b) =>
    //         getHardCodedWeight(b[1].kind) - getHardCodedWeight(a[1].kind),
    // },
};

const { getHardCodedWeight } = (() => {
    //TODO: Address this
    const mainServices = [
        "documentation/Fundamentals/Colors",
        "documentation/Components/Button",
        "documentation/Components/Alert",
    ];

    function getHardCodedWeight(kind) {
        for (let i = 0; i < mainServices.length; i++) {
            if (kind.toLowerCase().includes(mainServices[i].toLowerCase())) {
                return mainServices.length - i;
            }
        }

        return 0;
    }

    return { getHardCodedWeight };
})();
