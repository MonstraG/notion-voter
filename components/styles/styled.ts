import { styled as muiStyled, type Theme, type CreateMUIStyled } from "@mui/material/styles";
import type { Component } from "react";

const transientOptions: Parameters<typeof muiStyled>[1] = {
	shouldForwardProp: (propName: string) => !propName.startsWith("$")
};

// this exists only because of https://github.com/emotion-js/emotion/issues/2193
const styled: CreateMUIStyled<Theme> = (tag: keyof JSX.IntrinsicElements | Component) =>
	muiStyled(tag as any, transientOptions);

export default styled;
