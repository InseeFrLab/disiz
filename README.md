<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/120405033-efe83900-c347-11eb-9a7c-7b680c26a18c.png">  
</p>
<p align="center">
    <i>A disruptive UI toolkit</i><br>
    <i>Optimized for TypeScript</i><br>
    <i>Highly customizable but looks great out of the box.</i><br>
    <i>Compatible with mui large library of components</i>
    <br>
    <br>
    <img src="https://github.com/InseeFrLab/disiz/workflows/ci/badge.svg?branch=main">
    <img src="https://img.shields.io/bundlephobia/minzip/disiz">
    <img src="https://img.shields.io/npm/dw/disiz">
    <img src="https://img.shields.io/npm/l/disiz">
</p>
<p align="center">
  <a href="https://ui.onyxia.dev">Documentation</a>
</p>

Default design system carefully crafted by [Marc Hufschmitt](http://marchufschmitt.fr/)

This project is under active development. It's APIs are susceptible to change until v1.

`disiz` is largely inspired by [`onyxia-ui`](https://github.com/InseeFrlab/onyxia-ui)

WARNING: `disiz` isn't currently working with SSR. (You can't use it with Next.js)

# Motivation

[Material-ui](https://mui.com) is at it's core a vanilla JavaScript library.  
We argue that the experience for TypeScript developers is not optimal and somewhat frustrating.
Also we find problematic how hard it is to build an app that won't break on any other screen size.
In consequence, we wanted to create a ui toolkit that would be compatible with
`mui` v5 large library of components but that would also improves it in the following ways:

-   Optimized for typescript, theme customization without module augmentation.
-   Responsive design **way** more easy to implement.
-   Built in support for the dark mode, persistent across reload.
-   Easier, more guided, theme customization.
-   Provide splash screen that hides your components while they are not yet loaded.
-   Leverages an arguably better styling API: [TSS](https://github.com/InseeFrLab/tss-react).

# Quick start

```bash
yarn add disiz @mui/material @emotion/react @emotion/styled

# If you plan on using icons from: https://mui.com/components/material-icons/
yarn add @mui/icons-material
```

At this stage, the documentation is under the form of a very simple [demo project](https://github.com/InseeFrLab/disiz/tree/main/src/test).  
The actual theme configuration [happens here](https://github.com/InseeFrLab/disiz/blob/main/src/test/src/theme.ts).  
If you want to experiment with it you can run the demo app with:

NOTE for [Storybook](https://storybook.js.org) users: As of writing this lines storybook still uses by default emotion 10.  
mui and TSS runs emotion 11 so there is [some changes](https://github.com/InseeFrLab/disiz/blob/9f58cfffb3483f26d5b0218189ad8cc2f7f89df9/.storybook/main.js#L31-L32)
to be made to your `.storybook/main.js` to make it uses emotion 11.

[Launch dev environement](https://datalab.sspcloud.fr/launcher/inseefrlab-helm-charts-datascience/vscode?autoLaunch=true&onyxia.friendlyName=«disiz»&onyxia.share=true&s3.enabled=false&kubernetes.role=«admin»&security.allowlist.enabled=false&git.repository=«https%3A%2F%2Fgithub.com%2FInseeFrLab%2Fdisiz»&init.personalInit=«https%3A%2F%2Fraw.githubusercontent.com%2FInseeFrLab%2Fdisiz%2Fmain%2Fonyxia-init.sh»)

```bash
git clone https://github.com/InseeFrLab/disiz
cd disiz
yarn
yarn build
yarn start
```
