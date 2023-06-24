import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme(
  { config },
  {
    colors: {
      brand: {
        100: "#a93ccf",
      },
    },
    styles: {
      global: (props) => ({
        body: {
          bg: mode("gray.300", "whiteAlpha.200")(props),
        },
      }),
    },
  }
);
