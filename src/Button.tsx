/* eslint-disable @typescript-eslint/ban-types */
import type { FC } from "react";
import { forwardRef, memo, useState } from "react";
import { makeStyles } from "./lib/ThemeProvider";
import type { IconProps } from "./Icon";
import { id } from "tsafe/id";
import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";
import MuiButton from "@mui/material/Button";
import { capitalize } from "tsafe/capitalize";
import { assert } from "tsafe";
import type { Equals } from "tsafe/Equals";
import { breakpointsValues } from "./lib/breakpoints";
import { useCallbackFactory } from "powerhooks/useCallbackFactory";
import { changeColorOpacity } from "./lib";
import * as runExclusive from "run-exclusive";

export type ButtonProps<IconId extends string = never> =
    | ButtonProps.Regular<IconId>
    | ButtonProps.Submit<IconId>;

export namespace ButtonProps {
    type Common<IconId extends string> = {
        className?: string;

        /** Defaults to "primary" */
        variant?: "primary" | "secondary" | "tertiary" | "quatertiary";

        children: React.ReactNode;

        /** Defaults to false */
        disabled?: boolean;

        startIcon?: IconId;
        endIcon?: IconId;

        /** Defaults to false */
        autoFocus?: boolean;

        tabIndex?: number;

        name?: string;
        htmlId?: string;
        "aria-label"?: string;
    };

    export type Regular<IconId extends string = never> = Common<IconId> & {
        onClick?: () => void;
        href?: string;
        /** Default to true if href */
        doOpenNewTabIfHref?: boolean;
    };

    export type Submit<IconId extends string = never> = Common<IconId> & {
        type: "submit";
    };
}

export function createButton<IconId extends string = never>(params?: {
    Icon(props: IconProps<IconId>): ReturnType<FC>;
}) {
    const { Icon } = params ?? {
        "Icon": id<(props: IconProps<IconId>) => JSX.Element>(() => <></>),
    };

    const Button = memo(
        forwardRef<HTMLButtonElement, ButtonProps<IconId>>((props, ref) => {
            const {
                className,
                variant = "primary",
                disabled = false,
                children,
                startIcon,
                endIcon,
                autoFocus = false,
                tabIndex,
                name,
                htmlId,
                "aria-label": ariaLabel,
                //For the forwarding, rest should be empty (typewise)
                ...rest
            } = props;

            const [isMouseIn, setIsMouseIn] = useState(false);

            const handleMousePositionFactory = useCallbackFactory(
                runExclusive.build(async ([position]: ["in" | "out"]) => {
                    switch (position) {
                        case "in":
                            setIsMouseIn(true);
                            return;
                        case "out":
                            await new Promise<void>(resolve =>
                                setTimeout(resolve, 400),
                            );
                            setIsMouseIn(false);
                    }
                }),
            );

            const { classes, cx } = useStyles({
                variant,
                disabled,
                isMouseIn,
            });

            const IconWd = useGuaranteedMemo(
                () => (props: { iconId: IconId }) =>
                    (
                        <Icon
                            iconId={props.iconId}
                            className={classes.icon}
                            size="default"
                        />
                    ),
                [disabled, classes.icon],
            );

            return (
                <MuiButton
                    onMouseEnter={handleMousePositionFactory("in")}
                    onMouseLeave={handleMousePositionFactory("out")}
                    ref={ref}
                    className={cx(classes.root, className)}
                    //There is an error in @mui/material types, this should be correct.
                    disabled={disabled}
                    startIcon={
                        startIcon === undefined ? undefined : (
                            <IconWd iconId={startIcon} />
                        )
                    }
                    endIcon={
                        endIcon === undefined ? undefined : (
                            <IconWd iconId={endIcon} />
                        )
                    }
                    autoFocus={autoFocus}
                    tabIndex={tabIndex}
                    name={name}
                    id={htmlId}
                    aria-label={ariaLabel}
                    {...(() => {
                        if ("type" in rest) {
                            const { type, ...restRest } = rest;

                            //For the forwarding, rest should be empty (typewise),
                            assert<Equals<typeof restRest, {}>>();

                            return {
                                type,
                                ...restRest,
                            };
                        }

                        const {
                            onClick,
                            href,
                            doOpenNewTabIfHref = href !== undefined,
                            ...restRest
                        } = rest;

                        return {
                            onClick,
                            href,
                            "target": doOpenNewTabIfHref ? "_blank" : undefined,
                            ...restRest,
                        };
                    })()}
                >
                    {typeof children === "string"
                        ? capitalize(children)
                        : children}
                </MuiButton>
            );
        }),
    );

    const useStyles = makeStyles<{
        variant: NonNullable<ButtonProps["variant"]>;
        disabled: boolean;
        isMouseIn: boolean;
    }>({ "name": { Button } })((theme, { variant, disabled, isMouseIn }) => {
        const textColor =
            theme.colors.useCases.typography[
                (() => {
                    switch (variant) {
                        case "tertiary":
                            return "button2";
                        case "primary":
                            return "button1";
                        case "secondary":
                            return "secondary";
                        case "quatertiary":
                            return "primary";
                    }
                })()
            ];

        return {
            "root": (() => {
                const hoverBackgroundColor = (() => {
                    switch (variant) {
                        case "primary":
                            return theme.colors.useCases.accent.dark;
                        case "secondary":
                            return theme.colors.useCases.surfaces.secondary;
                        case "tertiary":
                            return theme.colors.useCases.surfaces.button2;
                        case "quatertiary":
                            return theme.colors.useCases.surfaces.tertiary;
                    }
                })();

                const backgroundColor = (() => {
                    switch (variant) {
                        case "primary":
                            return theme.colors.useCases.accent.main;
                        case "secondary":
                            return theme.colors.useCases.surfaces.tertiary;
                        case "tertiary":
                            return theme.colors.useCases.surfaces.button1;
                        case "quatertiary":
                            return theme.colors.useCases.surfaces.secondary;
                    }
                })();

                return {
                    "textTransform": "unset" as const,
                    "backgroundColor": disabled
                        ? changeColorOpacity({
                              "color": backgroundColor,
                              "opacity": 0.3,
                          })
                        : backgroundColor,
                    "borderRadius": "4px",
                    ...theme.spacing.rightLeft(
                        "padding",
                        (() => {
                            if (
                                theme.windowInnerWidth >= breakpointsValues.xl
                            ) {
                                return 3;
                            }

                            return 4;
                        })(),
                    ),
                    "&.MuiButton-text": {
                        "color": textColor,
                    },

                    "position": isMouseIn ? "relative" : "unset",
                    "& .MuiTouchRipple-root": {
                        "display": isMouseIn ? "unset" : "none",
                    },
                    "&:hover": {
                        "backgroundColor": hoverBackgroundColor,
                        // "& .MuiSvgIcon-root": {
                        //     "color": hoverTextColor,
                        // },
                        // "&.MuiButton-text": {
                        //     "color": hoverTextColor,
                        // },
                    },
                } as const;
            })(),
            "icon": {
                "color": textColor,
            },
        };
    });

    return { Button };
}
