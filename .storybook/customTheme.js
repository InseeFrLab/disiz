import { create } from "@storybook/theming";
import logo from "./static/onyxiaLogo.png";

export const darkTheme = create({
    "base": "dark",
    "brandTitle": "Disiz UI",
    "appBg": "#2c323f",
    "appContentBg": "#2c323f",
    "barBg": "#2c323f",
    "colorSecondary": "#ff562c",
    "textColor": "#f1f0eb",
    "textInverseColor": "#2c323f",
    "brandImage": logo,
    "brandUrl": "https://github.com/InseeFrLab/disiz",

    "fontBase": '"Open Sans", sans-serif',
    "fontCode": "monospace",
});

export const lightTheme = create({
    "base": "light",
    "brandTitle": "Disiz UI",
    "appBg": "#f1f0eb",
    "appContentBg": "#f1f0eb",
    "barBg": "#f1f0eb",
    "colorSecondary": "#ff562c",
    "textColor": "#2c323f",
    "textInverseColor": "#f1f0eb",
    "brandImage": logo,
    "brandUrl": "https://github.com/InseeFrLab/disiz",
});
