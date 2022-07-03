import emotionStyled, { CreateStyled } from "@emotion/styled";

type params = Parameters<CreateStyled>;

const transientOptions: params[1] = {
	shouldForwardProp: (propName: string) => !propName.startsWith("$")
};

const styled = (tag: params[0]) => emotionStyled(tag, transientOptions);

export default styled;
