import { Theme } from "@mui/material/styles";

const styleOverrides = (theme: Theme) => {
  return `
		.animate__animated.animate__entering-screen__duration {
			--animate-duration: ${theme.transitions.duration.enteringScreen}ms;
		}
		.animate__animated.animate__leaving-screen__duration {
			--animate-duration: ${theme.transitions.duration.leavingScreen}ms;
		}
		.animate__animated.animate__switch-medium__duration {
			--animate-duration: ${200}ms;
		}
	`;
};

export default styleOverrides;
