import { create } from "@storybook/theming";
import logo from "./static/onyxiaLogo.png";

export const darkTheme = create({
    "base": "dark",
    "brandTitle": "Disiz UI",
    "appBg": "#0A192E",
    "appContentBg": "#0A192E",
    "barBg": "#0A192E",
    "colorSecondary": "#FBD616",
    "textColor": "#f1f0eb",
    "textInverseColor": "#ffc0cb",
    "brandImage": logo,
    "brandUrl": "https://github.com/InseeFrLab/disiz",

    "fontBase": '"Open Sans", sans-serif',
    "fontCode": "monospace",
});

export const lightTheme = create({
    "base": "light",
    "brandTitle": "Disiz UI",
    "appBg": "#F5F7FA",
    "appContentBg": "#F5F7FA",
    "barBg": "#F5F7FA",
    "colorSecondary": "#FBD616",
    "textColor": "#0F417A",
    "textInverseColor": "#ffc0cb",
    "brandImage": logo,
    "brandUrl": "https://github.com/InseeFrLab/disiz",
});
