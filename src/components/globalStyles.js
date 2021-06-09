import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
@font-face {
    font-family: 'Noto sans';
    font-weight: 200;
    src: url("/fonts/NotoSans-Light.woff2") format("woff2"),
        url("/fonts/NotoSans-Light.woff") format("woff"),
}
@font-face {
    font-family: 'Noto sans';
    font-weight: 300;
    src: url("/fonts/NotoSans-Regular.woff2") format("woff2"),
        url("/fonts/NotoSans-Regular.woff") format("woff"),
}
@font-face {
    font-family: 'Noto sans';
    font-weight: 400;
    src: url("/fonts/NotoSans-DemiLight.woff2") format("woff2"),
        url("/fonts/NotoSans-DemiLight.woff") format("woff"),
}
@font-face {
    font-family: 'Noto sans';
    font-weight: 500;
    src: url("/fonts/NotoSans-Medium.woff2") format("woff2"),
        url("/fonts/NotoSans-Medium.woff") format("woff"),
}
@font-face {
    font-family: 'Noto sans';
    font-weight: 700;
    src: url("/fonts/NotoSans-Bold.woff2") format("woff2"),
        url("/fonts/NotoSans-Bold.woff") format("woff"),
}

:root{
    --bg: #17141f;
    --text: #efefef;
    --red: #dc2d43;
}

body{
    font-family: 'Noto sans';
    font-size: 14px;
    background: var(--bg);
    color: var(--text);
    line-height: 1.5;
    font-weight: 400;
}

*{
    box-sizing: border-box;
}

a{
    text-decoration: none;
    &:hover,
    &:active,
    &:focus{
        text-decoration: none;
    }
}

.container{
    width: 1200px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 1199px;){
        width: auto;
    }
}

.img-auto{
    width: 100%;
}

`;

export default GlobalStyles;