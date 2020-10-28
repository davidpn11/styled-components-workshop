import React from "react";
import { css, elem } from "./styled";

const BLUE = "aquamarine";
const YELLOW = "gold";

const wrapperStyle = `
  h1 {
    color: firebrick;
    &:hover {
      color: yellow;
    }=
  
    @media screen and (max-width: 350px) {
      background: blue;
    }
  }

  h2 {
    font-family: sans-serif;
    background: ${YELLOW};
  }

  p {
    color: chocolate;
  }
`;

const h2Style = `
  font-family: sans-serif;
  background: yellow;
  &:hover {
    color: red;
  }
`;

const h1ClassName = css(`
  color: red;

  &:hover {
    color: ${BLUE};
  }

  @media screen and (max-width: 350px) {
    background: blue;
  }
`);

const Button = elem<{}, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  "button"
)`
  font-family: "ubuntu";
  font-size: 14px;
  border: none;
  padding: 12px 24px;
  color: white;
  background-color: firebrick;
  cursor: pointer;
  transition: 0.2s ease;
`;

const Paragraph = elem<{ fontSize: number }>("p")`
font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "18px")};
`;

export default function App() {
  const [fontSize, setFontSize] = React.useState(4);
  const increaseFontSize = () => setFontSize(fontSize + 2);

  const wrapperClassName = css(wrapperStyle);
  const Header2 = elem("h2")`
  ${h2Style}`;

  return (
    <div className={wrapperClassName}>
      {/* <h1 className={h1ClassName}>Hello CodeSandbox</h1> */}
      <h1>Hello CodeSandbox</h1>
      <Header2>Hello styled</Header2>
      {/* <h2 className={h2ClassName}>Start editing to see some magic happen!</h2> */}
      <Button onClick={increaseFontSize}>Increase font</Button>
      <Paragraph fontSize={fontSize}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
        praesentium fuga! Esse alias, nulla reiciendis non quas soluta neque
        harum fuga aliquam deserunt unde, consequatur sequi nisi commodi quae
        dolorum?
      </Paragraph>
    </div>
  );
}
