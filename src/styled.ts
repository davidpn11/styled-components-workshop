import React from "react";
import { hash } from "./hash";
import { compile, serialize, stringify } from "stylis";

const styleTag = document.createElement("style");
document.head.appendChild(styleTag);

export const css = (styles: string) => {
  const uniqueClassName = `css-${hash(styles)}`;

  if (styleTag.innerText.indexOf(uniqueClassName) > -1) return uniqueClassName;
  styleTag.innerText += serialize(
    compile(`
      .${uniqueClassName} {
        ${styles}
      }
    `),
    stringify
  );

  return uniqueClassName;
};

type Interpolation<T> = string | ((props: T) => string);

export const composeStyles = <T>(props: T) => (
  strings: TemplateStringsArray,
  ...interpolations: Interpolation<T>[]
) => {
  let res = "";
  strings.forEach((s, i) => {
    res += s;
    if (i < interpolations.length) {
      const interpolation = interpolations[i];
      if (typeof interpolation === "function") {
        res += interpolation(props);
      } else {
        res += interpolation;
      }
    }
  });
  return res;
};

export const elem = <
  T,
  D extends React.Component["props"] = React.Component["props"]
>(
  tagName: string
) => (strings: TemplateStringsArray, ...interpolations: Interpolation<T>[]) => {
  const Element = (props: D & T) => {
    const composedStyles = composeStyles<T>(props)(strings, ...interpolations);
    const reactElement = React.createElement(
      tagName,
      { ...props, className: css(composedStyles) },
      props.children
    );
    return reactElement;
  };

  return Element;
};
