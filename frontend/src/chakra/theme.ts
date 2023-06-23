import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

export const theme = extendTheme(
  { config },
  {
    colors: {
      brand: {
        100: "#3D84F7",
      },
    },
    styles: {
      global: (props) => ({
        body: {
          bg: mode("gray.200", "whiteAlpha.200")(props),
        },
      }),
    },
  }
);
