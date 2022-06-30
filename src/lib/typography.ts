import type { TypographyOptions as MuiTypographyOptions } from "@mui/material/styles/createTypography";
import { id } from "tsafe/id";
import { breakpointsValues } from "./breakpoints";
import { objectKeys } from "tsafe/objectKeys";
export type { ChromeFontSize } from "powerhooks/ViewPortAdapter";
export { chromeFontSizesFactors } from "powerhooks/ViewPortAdapter";

export type TypographyDesc<CustomVariantName extends string> = {
    fontFamily: string;
    rootFontSizePx: number;
    variants: {
        [VariantName in
            | CustomVariantName
            | TypographyDesc.VariantNameBase]: TypographyDesc.Variant;
    };
};
export declare namespace TypographyDesc {
    export type Variant = {
        htmlComponent: HtmlComponent;
        fontWeight: FontWeightProperty;
        fontSizeRem: number;
        lineHeightRem: number;
        fontFamily?: string;
    };

    export namespace Variant {
        export type Style = {
            fontFamily: string;
            fontWeight: FontWeightProperty;
            fontSize: `${number}px`;
            lineHeight: `${number}px`;
        };
    }

    export type VariantNameBase =
        | "heading xl"
        | "heading l"
        | "heading m"
        | "heading s"
        | "heading xs"
        | "paragraph xl medium"
        | "paragraph xl semibold"
        | "paragraph l medium"
        | "paragraph l semibold"
        | "paragraph m medium"
        | "paragraph m semibold"
        | "paragraph s medium"
        | "paragraph s semibold"
        | "paragraph xs medium"
        | "paragraph xs semibold";

    export type FontWeightProperty =
        | FontWeightProperty.Globals
        | FontWeightProperty.FontWeightAbsolute
        | "bolder"
        | "lighter";

    export namespace FontWeightProperty {
        export type FontWeightAbsolute = number | "bold" | "normal";

        export type Globals =
            | "-moz-initial"
            | "inherit"
            | "initial"
            | "revert"
            | "unset";
    }

    export type HtmlComponent =
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "p"
        | "span"
        | "div"
        | "a";
}

export type ComputedTypography<CustomVariantName extends string> = {
    rootFontSizePx: number;
    fontFamily: string;
    variants: {
        [VariantName in CustomVariantName | TypographyDesc.VariantNameBase]: {
            htmlComponent: TypographyDesc.HtmlComponent;
            style: TypographyDesc.Variant.Style;
        };
    };
};

export type GetTypographyDesc<CustomVariantName extends string> = (params: {
    windowInnerWidth: number;
    windowInnerHeight: number;
    browserFontSizeFactor: number;
}) => TypographyDesc<CustomVariantName>;

export const defaultGetTypographyDesc: GetTypographyDesc<never> = ({
    windowInnerWidth,
    browserFontSizeFactor,
}) => ({
    "fontFamily": "sans-serif",
    "rootFontSizePx": 16 * browserFontSizeFactor,
    "variants": {
        "heading xl": {
            "htmlComponent": "h1",
            "fontWeight": id<TypographyDesc.FontWeightProperty>(800),
            ...(() => {
                //TODO -> Size with diffrent size go FIGMA
                if (windowInnerWidth >= breakpointsValues.xl) {
                    return {
                        "fontSizeRem": 3,
                        "lineHeightRem": 3.5,
                    };
                }
                if (windowInnerWidth >= breakpointsValues.lg) {
                    return {
                        "fontSizeRem": 3,
                        "lineHeightRem": 3.5,
                    };
                }
                return {
                    "fontSizeRem": 3,
                    "lineHeightRem": 3.5,
                };
            })(),
        },

        "heading l": {
            "htmlComponent": "h2",
            "fontWeight": id<TypographyDesc.FontWeightProperty>(800),
            "fontSizeRem": 2.25,
            "lineHeightRem": 3,
        },

        "heading m": {
            "htmlComponent": "h3",
            "fontWeight": id<TypographyDesc.FontWeightProperty>("bold"),
            "fontSizeRem": 1.75,
            "lineHeightRem": 2.25,
        },
        "heading s": {
            "htmlComponent": "h4",
            "fontWeight": id<TypographyDesc.FontWeightProperty>("bold"),
            "fontSizeRem": 1.5,
            "lineHeightRem": 1.75,
        },
        "heading xs": {
            "htmlComponent": "h5",
            "fontWeight": id<TypographyDesc.FontWeightProperty>("bold"),
            "fontSizeRem": 1.25,
            "lineHeightRem": 1.5,
        },
        "paragraph xl semibold": {
            "htmlComponent": "h6",
            "fontWeight": id<TypographyDesc.FontWeightProperty>(600),
            "fontSizeRem": 1.25,
            "lineHeightRem": 1.5,
        },
        "paragraph xl medium": {
            "htmlComponent": "h6",
            "fontWeight": id<TypographyDesc.FontWeightProperty>(500),
            "fontSizeRem": 1.25,
            "lineHeightRem": 1.5,
        },
        "paragraph l semibold": {
            "htmlComponent": "span",
            "fontWeight": id<TypographyDesc.FontWeightProperty>(600),
            "fontSizeRem": 1.125,
            "lineHeightRem": 1.375,
        },
        "paragraph l medium": {
            "htmlComponent": "p",
            "fontWeight": id<TypographyDesc.FontWeightProperty>(500),
            "fontSizeRem": 1.125,
            "lineHeightRem": 1.375,
        },
        "paragraph m semibold": {
            "htmlComponent": "span",
            "fontWeight": id<TypographyDesc.FontWeightProperty>(600),
            "fontSizeRem": 1,
            "lineHeightRem": 1.25,
        },
        "paragraph m medium": {
            "htmlComponent": "p",
            "fontWeight": id<TypographyDesc.FontWeightProperty>(500),
            "fontSizeRem": 1,
            "lineHeightRem": 1.25,
        },
        "paragraph s semibold": {
            "htmlComponent": "span",
            "fontWeight": id<TypographyDesc.FontWeightProperty>(600),
            "fontSizeRem": 0.875,
            "lineHeightRem": 1.125,
        },
        "paragraph s medium": {
            "htmlComponent": "p",
            "fontWeight": id<TypographyDesc.FontWeightProperty>(500),
            "fontSizeRem": 0.875,
            "lineHeightRem": 1.125,
        },
        "paragraph xs semibold": {
            "htmlComponent": "span",
            "fontWeight": id<TypographyDesc.FontWeightProperty>(600),
            "fontSizeRem": 0.75,
            "lineHeightRem": 1,
        },
        "paragraph xs medium": {
            "htmlComponent": "p",
            "fontWeight": id<TypographyDesc.FontWeightProperty>(500),
            "fontSizeRem": 0.75,
            "lineHeightRem": 1,
        },
    },
});

export const { createMuiTypographyOptions, getComputedTypography } = (() => {
    type TypographyDescLike<CustomVariantName extends string> = {
        fontFamily: string;
        rootFontSizePx: number;
        variants: {
            [Name in TypographyDesc.VariantNameBase | CustomVariantName]: {
                fontWeight: TypographyDesc.FontWeightProperty;
                fontSizeRem: number;
                lineHeightRem: number;
                fontFamily?: string;
            };
        };
    };

    function getTypographyVariantStyleFactory<
        CustomVariantName extends string,
    >(params: { typographyDesc: TypographyDescLike<CustomVariantName> }) {
        const {
            typographyDesc: { fontFamily, rootFontSizePx, variants },
        } = params;

        function getTypographyVariantStyle(params: {
            variantName: TypographyDesc.VariantNameBase | CustomVariantName;
        }): TypographyDesc.Variant.Style {
            const { variantName } = params;

            const {
                fontSizeRem,
                lineHeightRem,
                fontWeight,
                fontFamily: variantFontFamily,
            } = variants[variantName];

            return {
                "fontFamily": variantFontFamily ?? fontFamily,
                fontWeight,
                "fontSize": `${fontSizeRem * rootFontSizePx}px`,
                "lineHeight": `${lineHeightRem * rootFontSizePx}px`,
            };
        }

        return { getTypographyVariantStyle };
    }

    function getComputedTypography<CustomVariantName extends string>(params: {
        typographyDesc: TypographyDesc<CustomVariantName>;
    }): ComputedTypography<CustomVariantName> {
        const { typographyDesc } = params;

        const { getTypographyVariantStyle } = getTypographyVariantStyleFactory({
            typographyDesc,
        });

        const computedTypography: ComputedTypography<CustomVariantName> = {
            "rootFontSizePx": typographyDesc.rootFontSizePx,
            "fontFamily": typographyDesc.fontFamily,
            "variants": {} as any,
        };

        objectKeys(typographyDesc.variants).forEach(
            variantName =>
                (computedTypography.variants[variantName] = {
                    "style": getTypographyVariantStyle({ variantName }),
                    "htmlComponent":
                        typographyDesc.variants[variantName].htmlComponent,
                }),
        );

        return computedTypography;
    }

    function createMuiTypographyOptions(params: {
        typographyDesc: TypographyDescLike<never>;
    }): MuiTypographyOptions {
        const { typographyDesc } = params;

        const { getTypographyVariantStyle } = getTypographyVariantStyleFactory({
            typographyDesc,
        });

        return {
            "fontFamily": typographyDesc.fontFamily,
            "fontWeightRegular": "normal",
            "fontWeightMedium": 500,
            "h1": getTypographyVariantStyle({
                "variantName": "heading l",
            }),
            "h2": getTypographyVariantStyle({ "variantName": "heading l" }),
            "h3": getTypographyVariantStyle({ "variantName": "heading m" }),
            "h4": getTypographyVariantStyle({
                "variantName": "heading s",
            }),
            "h5": getTypographyVariantStyle({
                "variantName": "heading xs",
            }),
            "h6": getTypographyVariantStyle({
                "variantName": "paragraph xl medium",
            }),
            "subtitle1": getTypographyVariantStyle({
                "variantName": "paragraph l semibold",
            }),
            "subtitle2": getTypographyVariantStyle({
                "variantName": "paragraph l medium",
            }),
            "body1": getTypographyVariantStyle({
                "variantName": "paragraph m medium",
            }),
            "body2": getTypographyVariantStyle({
                "variantName": "paragraph s medium",
            }),
            "caption": getTypographyVariantStyle({
                "variantName": "paragraph xs medium",
            }),
            "button": getTypographyVariantStyle({
                "variantName": "paragraph xl semibold",
            }),
        };
    }

    return { createMuiTypographyOptions, getComputedTypography };
})();
