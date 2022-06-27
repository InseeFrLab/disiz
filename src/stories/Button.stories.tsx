import { Button } from "./theme";
import { sectionName } from "./sectionName";
import { getStoryFactory, logCallbacks } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "argTypes": {
        "variant": {
            "options": [
                "primary",
                "secondary",
                "tertiary",
                "borderless",
                "transparent",
            ],
            "control": { "type": "radio" },
        },
        "disabled": { "control": { "type": "boolean" } },
    },
    "wrappedComponent": { Button },
});

export default meta;

export const VueNoIcon = getStory({
    "children": "Default",
    "variant": "primary",
    "disabled": false,
    ...logCallbacks(["onClick"]),
});

export const VueWithStartIcon = getStory({
    "children": "Foo bar",
    "startIcon": "help",
    "variant": "primary",
    "disabled": false,
    ...logCallbacks(["onClick"]),
});
