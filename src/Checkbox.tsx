import { useState, useEffect, memo } from "react";
import MuiCheckbox from "@mui/material/Checkbox";
import type { CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";
import { useConstCallback } from "powerhooks/useConstCallback";
import { makeStyles } from "./lib/ThemeProvider";

export type CheckboxProps = MuiCheckboxProps;

export const Checkbox = memo((props: CheckboxProps) => {
    const { defaultChecked: props_defaultChecked, className, ...rest } = props;

    const { classes, cx } = useStyles();

    const defaultChecked =
        rest.checked === undefined ? false : props_defaultChecked ?? false;

    const [isChecked, setIsChecked] = useState(defaultChecked);

    useEffect(() => setIsChecked(defaultChecked), [defaultChecked]);

    const onChange = useConstCallback<CheckboxProps["onChange"]>(
        (event, checked) => {
            setIsChecked(checked);

            rest.onChange?.(event, checked);
        },
    );

    return (
        <MuiCheckbox
            className={cx(classes.MuiCheckbox, className)}
            {...rest}
            {...(rest.checked !== undefined
                ? {
                      "value": rest.checked ? "on" : "off",
                  }
                : {
                      "checked": isChecked,
                      onChange,
                      "value": isChecked ? "on" : "off",
                  })}
        />
    );
});

const useStyles = makeStyles({ "name": { Checkbox } })(theme => ({
    "MuiCheckbox": {
        "color": theme.colors.useCases.typography.tertiary,
        "&.Mui-checked": {
            color: theme.colors.useCases.typography.primary,
        },
    },
}));
