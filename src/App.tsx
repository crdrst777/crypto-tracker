import { createGlobalStyle } from "styled-components";
// import { reset } from "styled-reset";
import Router from "./Router";

// const GlobalStyle = createGlobalStyle`
// ${reset}
// @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
// * {
//   box-sizing: border-box;
// }
// body {
//   font-family: 'Source Sans Pro', sans-serif;
//   background-color: ${(props) => props.theme.bgColor};
//   color: ${(props) => props.theme.textColor};
// }
// a {
//   text-decoration: none;
//   /* &:link,&:visited{
//   color: inherit;
//   } */
//   color: inherit;
// }
// `;
// 아래처럼 하거나 이렇게 하거나 똑같은거같은데..? 니코 말로는 아래처럼 해야 전체 도큐먼트에 적용할수 있다고 한다..?

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
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
*{
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
a{
  text-decoration: none;
  &:link,&:visited{
    color: inherit;
  }
  color: inherit;
}
`;

function App() {
  return (
    // 단 하나의 엘리먼트만 리턴해야 하기때문에 엘리먼트들을 감싸는 하나의 엘리먼트가 필요한것임. 그래서 아래처럼 한다.
    // <></> -> fragment - 일종의 유령 컴포넌트
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
