import React, { useState, useEffect } from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import { Checkbox } from "../Checkbox";
import type { CheckboxProps } from "../Checkbox";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { symToStr } from "tsafe/symToStr";

function ComponentControlled(props: {
    defaultIsChecked: boolean;
    disabled: boolean;
}) {
    const { defaultIsChecked, disabled } = props;

    const [isChecked, setIsChecked] = useState<boolean>(defaultIsChecked);

    useEffect(() => setIsChecked(defaultIsChecked), [defaultIsChecked]);

    const onChange = useConstCallback<CheckboxProps["onChange"]>(
        (_event, checked) => setIsChecked(checked),
    );

    return (
        <Checkbox checked={isChecked} onChange={onChange} disabled={disabled} />
    );
}

function ComponentUncontrolled(props: {
    defaultIsChecked: boolean;
    disabled: boolean;
}) {
    const { defaultIsChecked, disabled } = props;

    return <Checkbox defaultChecked={defaultIsChecked} disabled={disabled} />;
}

function Component(props: {
    mode: "controlled" | "uncontrolled";
    defaultIsChecked: boolean;
    disabled: boolean;
}) {
    const { mode, ...rest } = props;

    switch (mode) {
        case "controlled":
            return <ComponentControlled {...rest} />;
        case "uncontrolled":
            return <ComponentUncontrolled {...rest} />;
    }
}

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { [symToStr({ Checkbox })]: Component },
});

export default meta;

export const VueControlled = getStory({
    "mode": "controlled",
    "defaultIsChecked": false,
    "disabled": false,
});

export const VueUncontrolled = getStory({
    "mode": "uncontrolled",
    "defaultIsChecked": false,
    "disabled": false,
});
