import { changeColorOpacity } from "../tools/changeColorOpacity";
export * from "../tools/changeColorOpacity";

import type { PaletteOptions as MuiPaletteOptions } from "@mui/material/styles/createPalette";
import type { Param0 } from "tsafe";

export type PaletteBase = typeof defaultPalette;
export type ColorUseCasesBase = ReturnType<typeof createDefaultColorUseCases>;

export type CreateColorUseCase<
    Palette extends PaletteBase,
    ColorUseCases extends ColorUseCasesBase,
> = (params: { isDarkModeEnabled: boolean; palette: Palette }) => ColorUseCases;

export const defaultPalette = {
    "inseeBlue": {
        "900": "#072A43",
        "800": "#0C3A5A",
        "700": "#0F417A",
        "600": "#0A4AA5",
        "500": "#286AC7",
        "400": "#5B8ED4",
        "300": "#8DB0E1",
        "200": "#AACAF1",
        "100": "#C4E1FF",
    },
    "inseeYellow": {
        "900": "#B07102",
        "800": "#D98C07",
        "700": "#E89E0B",
        "600": "#FFC300",
        "500": "#FBD616",
        "400": "#FFDA5A",
        "300": "#FFE58E",
        "200": "#FFEAAB",
        "100": "#FDF0C9",
    },
    "inseeGray": {
        "900": "#0A192E",
        "800": "#1D2A3D",
        "700": "#3A4657",
        "600": "#57677D",
        "500": "#7C8A9D",
        "400": "#BCC2CC",
        "300": "#D3DBE5",
        "200": "#E6EAF0",
        "100": "#F5F7FA",
        "black": "#000000",
        "white": "#FFFFFF",
    },
    "inseeRed": {
        "900": "#5D1212",
        "800": "#820B26",
        "700": "#9A1D39",
        "600": "#C00534",
        "500": "#E4003A",
        "400": "#EB617F",
        "300": "#F190A5",
        "200": "#F5B8C2",
        "100": "#FBDFE4",
    },
    "inseeAqua": {
        "900": "#103444",
        "800": "#1C4B5F",
        "700": "#0C6876",
        "600": "#008085",
        "500": "#0AACAB",
        "400": "#71C3C7",
        "300": "#97CFD0",
        "200": "#C6E3E4",
        "100": "#DDEFF0",
    },
    "inseeMagenta": {
        "900": "#79044E",
        "800": "#991167",
        "700": "#A92779",
        "600": "#B43B87",
        "500": "#CD4C9D",
        "400": "#E182BE",
        "300": "#E294C6",
        "200": "#F0B9DC",
        "100": "#F3D2E7",
    },
    "inseeGreen": {
        "900": "#044628",
        "800": "#03532F",
        "700": "#036237",
        "600": "#068043",
        "500": "#1CA459",
        "400": "#4BB375",
        "300": "#8BC8A4",
        "200": "#A2D3B6",
        "100": "#C0E0CA",
    },
    "TODO": {
        "main": "#FFC0CB",
        "light": "#FFC0CB",
        "light2": "#FFC0CB",
        "dark": "#FFC0CB",
    },
};

export function createDefaultColorUseCases(
    params: Param0<CreateColorUseCase<PaletteBase, any>>,
) {
    const { isDarkModeEnabled, palette } = params;

    return {
        "surfaces": {
            "primary": palette.inseeGray[isDarkModeEnabled ? "900" : "100"],
            "secondary": palette.inseeGray[isDarkModeEnabled ? "800" : "white"],
            "tertiary": palette.inseeGray[isDarkModeEnabled ? "700" : "200"],
            "button1": isDarkModeEnabled
                ? palette.inseeGray["100"]
                : palette.inseeBlue["700"],
            "button2": isDarkModeEnabled
                ? palette.inseeGray["400"]
                : palette.inseeBlue["900"],
        },
        "typography": {
            "primary": isDarkModeEnabled
                ? palette.inseeGray["100"]
                : palette.inseeBlue["700"],
            "secondary": palette.inseeGray[isDarkModeEnabled ? "300" : "700"],
            "tertiary": palette.inseeGray[isDarkModeEnabled ? "500" : "600"],
            "hint": palette.inseeGray[isDarkModeEnabled ? "600" : "400"],
            "button1": palette.inseeBlue["700"],
            "button2": isDarkModeEnabled
                ? palette.inseeBlue["700"]
                : palette.inseeGray["100"],
        },
        "accent": {
            "dark": palette.inseeYellow[isDarkModeEnabled ? "200" : "700"],
            "main": palette.inseeYellow["500"],
            "light": palette.inseeYellow[isDarkModeEnabled ? "700" : "200"],
            "mainAlpha20": changeColorOpacity({
                "color": palette.inseeYellow["500"],
                "opacity": 0.2,
            }),
            "mainAlpha10": changeColorOpacity({
                "color": palette.inseeYellow["500"],
                "opacity": 0.1,
            }),
            "mainAlpha5": changeColorOpacity({
                "color": palette.inseeYellow["500"],
                "opacity": 0.07,
            }),
        },
        "positive": {
            "dark": palette.inseeGreen[isDarkModeEnabled ? "100" : "700"],
            "main": palette.inseeGreen[isDarkModeEnabled ? "400" : "500"],
            "light": palette.inseeGreen[isDarkModeEnabled ? "500" : "300"],
            "background": palette.inseeGreen[isDarkModeEnabled ? "900" : "100"],
            "mainAlpha10": changeColorOpacity({
                "color": palette.inseeGreen[isDarkModeEnabled ? "400" : "500"],
                "opacity": 0.1,
            }),
        },
        "negative": {
            "dark": palette.inseeRed[isDarkModeEnabled ? "100" : "700"],
            "main": palette.inseeRed[isDarkModeEnabled ? "400" : "500"],
            "light": palette.inseeRed[isDarkModeEnabled ? "500" : "300"],
            "background": palette.inseeRed[isDarkModeEnabled ? "900" : "100"],
            "mainAlpha10": changeColorOpacity({
                "color": palette.inseeRed[isDarkModeEnabled ? "400" : "500"],
                "opacity": 0.1,
            }),
        },
        "warning": {
            "dark": palette.inseeYellow[isDarkModeEnabled ? "100" : "700"],
            "main": palette.inseeYellow[isDarkModeEnabled ? "400" : "500"],
            "light": palette.inseeYellow[isDarkModeEnabled ? "500" : "300"],
            "background":
                palette.inseeYellow[isDarkModeEnabled ? "900" : "100"],
            "mainAlpha10": changeColorOpacity({
                "color": palette.inseeYellow[isDarkModeEnabled ? "400" : "500"],
                "opacity": 0.1,
            }),
        },
        "info": {
            "dark": palette.inseeBlue[isDarkModeEnabled ? "100" : "700"],
            "main": palette.inseeBlue[isDarkModeEnabled ? "400" : "500"],
            "light": palette.inseeBlue[isDarkModeEnabled ? "500" : "300"],
            "background": palette.inseeBlue[isDarkModeEnabled ? "900" : "100"],
            "mainAlpha10": changeColorOpacity({
                "color": palette.inseeBlue[isDarkModeEnabled ? "400" : "500"],
                "opacity": 0.1,
            }),
        },
    };
}

export function createMuiPaletteOptions(params: {
    isDarkModeEnabled: boolean;
    useCases: ColorUseCasesBase;
}): MuiPaletteOptions {
    const { isDarkModeEnabled, useCases } = params;

    return {
        "mode": isDarkModeEnabled ? "dark" : "light",
        "primary": {
            "main": useCases.accent.main,
            "light": useCases.accent.light,
        },
        "secondary": {
            "main": useCases.typography.primary,
            "light": useCases.typography.secondary,
        },
        "error": {
            "light": useCases.negative.background,
            "main": useCases.negative.main,
            "contrastText": useCases.typography.primary,
        },
        "success": {
            "light": useCases.positive.background,
            "main": useCases.positive.main,
            "contrastText": useCases.typography.primary,
        },
        "info": {
            "light": useCases.info.background,
            "main": useCases.info.main,
            "contrastText": useCases.typography.primary,
        },
        "warning": {
            "light": useCases.warning.background,
            "main": useCases.warning.main,
            "contrastText": useCases.typography.primary,
        },
        "text": {
            "primary": useCases.typography.primary,
            "secondary": useCases.typography.secondary,
            "disabled": useCases.typography.hint,
        },
        "divider": useCases.typography.primary,
        "background": {
            "paper": useCases.surfaces.secondary,
            "default": useCases.surfaces.primary,
        },
        "action": {
            "active": useCases.accent.main,
            "hover": useCases.accent.light,
            "selected": useCases.accent.dark,
            "disabled": "#FF0084", //"opacity 40%",
            "disabledBackground": "#FF0084", //"opacity 40%",
            "focus": useCases.accent.dark,
        },
    } as const;
}

export function getIsDarkModeEnabledOsDefault() {
    return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
}
