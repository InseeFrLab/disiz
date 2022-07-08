import { makeStyles } from "./lib/ThemeProvider";
import { Text } from "./Text/TextBase";
import { useState, useEffect, useMemo, useReducer, memo } from "react";
import type { ReactNode, RefObject } from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import MuiTextField from "@mui/material/TextField";
import { getBrowser } from "./tools/getBrowser";
import InputAdornment from "@mui/material/InputAdornment";
import { createIconButton } from "./IconButton";
import { createIcon } from "./Icon";
import { useEffectOnValueChange } from "powerhooks/useEffectOnValueChange";
import type { ReturnType } from "tsafe";
import { CircularProgress } from "./CircularProgress";
import { Tooltip } from "./Tooltip";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Help from "@mui/icons-material/Help";
import { useDomRect } from "powerhooks/useDomRect";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

export type TextFieldProps = {
    className?: string;
    id?: string;
    name?: string;
    /** Default text */
    type?: "text" | "password" | "email";
    /** Will overwrite value when updated */
    disableUnderline?: boolean;
    defaultValue?: string;
    inputProps_ref?: RefObject<HTMLInputElement>;
    "inputProps_aria-label"?: string;
    inputProps_tabIndex?: number;
    inputProps_spellCheck?: boolean;
    inputProps_autoFocus?: boolean;
    /**
     * If true, it sets the helper text in red.
     * Will be set automatically if getIsValidValue is provided
     * */
    "inputProps_aria-invalid"?: boolean;
    InputProps_endAdornment?: ReactNode;
    /** Only use when getIsValidValue isn't used */
    disabled?: boolean;
    multiline?: boolean;
    /** Return false to e.preventDefault() and e.stopPropagation() */
    onEscapeKeyDown?: (params: {
        preventDefaultAndStopPropagation(): void;
    }) => void;
    onEnterKeyDown?: (params: {
        preventDefaultAndStopPropagation(): void;
    }) => void;
    onBlur?: () => void;

    getIsValidValue?: (
        value: string,
    ) =>
        | { isValidValue: true }
        | { isValidValue: false; message: string | ReactNode };
    /**
     * Invoked on first render,
     * called again if getIsValidValue have been updated and
     * the validity of the current value changes.
     */
    onValueBeingTypedChange?: (
        params: { value: string } & ReturnType<
            TextFieldProps["getIsValidValue"]
        >,
    ) => void;
    label?: ReactNode;
    helperText?: ReactNode;
    questionMarkHelperText?: string | NonNullable<ReactNode>;
    doOnlyValidateInputAfterFistFocusLost?: boolean;
    /** Default false */
    isCircularProgressShown?: boolean;
    selectAllTextOnFocus?: boolean;
    /** Default false */
    doRenderAsTextArea?: boolean;
};

const { Icon } = createIcon({
    "visibilityOff": VisibilityOff,
    "visibility": Visibility,
    "help": Help,
});

const { IconButton } = createIconButton({ Icon });

export const TextField = memo((props: TextFieldProps) => {
    const {
        defaultValue = "",
        getIsValidValue,
        doOnlyValidateInputAfterFistFocusLost = true,
        onValueBeingTypedChange,
        onBlur,
        onEscapeKeyDown,
        onEnterKeyDown,
        className,
        type = "text",
        disableUnderline = false,
        isCircularProgressShown = false,
        helperText,
        id: htmlId,
        name,
        selectAllTextOnFocus,
        inputProps_ref,
        "inputProps_aria-label": inputProps_ariaLabel,
        inputProps_tabIndex,
        inputProps_spellCheck,
        inputProps_autoFocus,
        "inputProps_aria-invalid": inputProps_ariaInvalid,
        InputProps_endAdornment,
        questionMarkHelperText,
        doRenderAsTextArea = false,
        ...completedPropsRest
    } = props;

    const { value, transformAndSetValue } = (function useClosure() {
        const [value, setValue] = useState(defaultValue);

        const transformAndSetValue = useConstCallback((value: string) => {
            if (
                !isValidationEnabled &&
                !doOnlyValidateInputAfterFistFocusLost
            ) {
                enableValidation();
            }

            setValue(value);
        });

        return { value, transformAndSetValue };
    })();

    useEffectOnValueChange(
        () => transformAndSetValue(defaultValue),
        [defaultValue],
    );

    const getIsValidValueResult = useMemo(
        () => getIsValidValue?.(value) ?? { "isValidValue": true as const },
        [value, getIsValidValue ?? Object],
    );

    useEffect(() => {
        onValueBeingTypedChange?.({ value, ...getIsValidValueResult });
    }, [
        value,
        getIsValidValueResult.isValidValue,
        getIsValidValueResult.isValidValue
            ? Object
            : getIsValidValueResult.message,
    ]);

    const [isValidationEnabled, enableValidation] = useReducer(
        () => true,
        false,
    );

    const hasError =
        inputProps_ariaInvalid ??
        (isValidationEnabled ? !getIsValidValueResult.isValidValue : false);

    const {
        domRect: { height: rootHeight },
        ref,
    } = useDomRect();

    const { classes, cx } = useStyles({
        hasError,
        rootHeight,
    });

    const [isPasswordShown, toggleIsPasswordShown] = useReducer(
        (v: boolean) => !v,
        false,
    );

    const onKeyDown = useConstCallback(
        (
            event: React.KeyboardEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLDivElement
            >,
        ) => {
            const key = (() => {
                switch (event.key) {
                    case "Escape":
                    case "Enter":
                        return event.key;
                    default:
                        return "irrelevant";
                }
            })();

            if (key === "irrelevant") {
                return;
            }

            const preventDefaultAndStopPropagation = () => {
                event.preventDefault();
                event.stopPropagation();
            };

            switch (key) {
                case "Escape":
                    onEscapeKeyDown?.({ preventDefaultAndStopPropagation });
                    return;
                case "Enter":
                    onEnterKeyDown?.({ preventDefaultAndStopPropagation });
                    return;
            }

            assert<Equals<typeof key, never>>();
        },
    );

    const InputProps = useMemo(
        () => ({
            "disableUnderline": disableUnderline,
            "endAdornment":
                InputProps_endAdornment ?? isCircularProgressShown ? (
                    <InputAdornment position="end">
                        <CircularProgress color="textPrimary" size={10} />
                    </InputAdornment>
                ) : type === "password" ? (
                    <InputAdornment position="end">
                        <IconButton
                            iconId={
                                isPasswordShown ? "visibilityOff" : "visibility"
                            }
                            onClick={toggleIsPasswordShown}
                        />
                    </InputAdornment>
                ) : undefined,
        }),
        [
            disableUnderline,
            isPasswordShown,
            type,
            InputProps_endAdornment,
            isCircularProgressShown,
        ],
    );

    const inputProps = useMemo(
        () => ({
            "ref": inputProps_ref,
            "aria-label": inputProps_ariaLabel,
            "tabIndex": inputProps_tabIndex,
            "spellCheck": inputProps_spellCheck,
            "autoFocus": inputProps_autoFocus,
            ...(inputProps_ariaInvalid !== undefined
                ? {
                      "aria-invalid": inputProps_ariaInvalid,
                  }
                : hasError
                ? { "aria-invalid": true }
                : {}),
        }),
        [
            inputProps_ref ?? Object,
            inputProps_ariaLabel ?? Object,
            inputProps_tabIndex ?? Object,
            inputProps_spellCheck ?? Object,
            inputProps_autoFocus ?? Object,
            inputProps_ariaInvalid ?? Object,
            hasError,
            disableUnderline,
        ],
    );

    const onMuiTextfieldBlur = useConstCallback(() => {
        if (!isValidationEnabled) enableValidation();
        onBlur?.();
    });
    const onFocus = useConstCallback(
        ({
            target,
        }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (!selectAllTextOnFocus) return;
            target.setSelectionRange(0, target.value.length);
        },
    );

    const onChange = useConstCallback(
        ({
            target,
        }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            transformAndSetValue(target.value),
    );

    const helperTextNode = (
        <Text
            className={classes.helperText}
            typo="paragraph s medium"
            htmlComponent="span"
        >
            {isValidationEnabled && !getIsValidValueResult.isValidValue
                ? getIsValidValueResult.message || helperText
                : helperText}
            &nbsp;
            {questionMarkHelperText !== undefined && (
                <Tooltip title={questionMarkHelperText}>
                    <Icon iconId="help" className={classes.questionMark} />
                </Tooltip>
            )}
        </Text>
    );

    return (
        <MuiTextField
            className={cx(classes.muiTextField, className)}
            multiline={doRenderAsTextArea}
            ref={ref}
            variant="standard"
            type={
                type !== "password"
                    ? type
                    : isPasswordShown
                    ? "text"
                    : "password"
            }
            value={value}
            error={hasError}
            helperText={helperTextNode}
            InputProps={InputProps}
            onBlur={onMuiTextfieldBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            id={htmlId}
            name={name}
            inputProps={inputProps}
            {...completedPropsRest}
        />
    );
});

const useStyles = makeStyles<{
    hasError: boolean;
    rootHeight: number;
}>({
    "name": { TextField },
})((theme, { hasError, rootHeight }) => ({
    "muiTextField": {
        "& .MuiFormHelperText-root": {
            "position": "absolute",
            "top": rootHeight,
            "visibility": rootHeight === 0 ? "hidden" : undefined,
        },
        "& .MuiFormLabel-root": {
            "color": hasError
                ? theme.colors.useCases.negative.dark
                : theme.colors.useCases.typography.secondary,
        },
        "&:focus": {
            "outline": "unset",
        },
        "& input:-webkit-autofill": {
            ...(() => {
                switch (getBrowser()) {
                    case "chrome":
                    case "safari":
                        return {
                            "WebkitTextFillColor":
                                theme.colors.useCases.typography[
                                    theme.isDarkModeEnabled
                                        ? "primary"
                                        : "secondary"
                                ],
                            "WebkitBoxShadow": `0 0 0 1000px ${theme.colors.useCases.surfaces.primary} inset`,
                        };
                    default:
                        return {};
                }
            })(),
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            "borderBottomWidth": 1,
        },
        "& .MuiInput-underline:after": {
            "borderBottomWidth": 1,
        },
    },
    "helperText": {
        "color": hasError
            ? theme.colors.useCases.negative.dark
            : theme.colors.useCases.typography.tertiary,
        "whiteSpace": "nowrap",
    },
    "questionMark": {
        "fontSize": "inherit",
        ...(() => {
            const factor = 1.5;

            return {
                "width": `${factor}em`,
                "height": `${factor}em`,
            };
        })(),
    },
}));
