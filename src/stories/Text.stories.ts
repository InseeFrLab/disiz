import { Text } from "./theme";
import type { TypographyDesc } from "../lib/typography";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const variantNameBase = [
    "heading xl",
    "heading l",
    "heading m",
    "heading s",
    "heading xs",
    "paragraph xl medium",
    "paragraph xl semibold",
    "paragraph l medium",
    "paragraph l semibold",
    "paragraph m medium",
    "paragraph m semibold",
    "paragraph s medium",
    "paragraph s semibold",
    "paragraph xs medium",
    "paragraph xs semibold",
] as const;

assert<
    Equals<TypographyDesc.VariantNameBase, typeof variantNameBase[number]>
>();

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Text },
    "argTypes": {
        "typo": {
            "options": variantNameBase,
            "control": { "type": "radio" },
        },
    },
});

export default meta;

export const Vue1 = getStory({
    "typo": "heading l",
    "children": "Lorem ipsum dolor sit amet",
});
