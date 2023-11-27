import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { AppBar, Toolbar, Typography, Box, Link, Stack } from "@mui/material";
import type { Metadata } from "next";
import Image from "next/image";
import { i18nEN } from "@/i18n";
import ontologyConfig from "../../ontology.config";

export const metadata: Metadata = {
  title: "Uxiverse ontology",
  description:
    "Structured Relationships between Digital User Interface Components",
};

const iconSize = 40;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let homeLink = "/";
  if (
    ontologyConfig.baseNextJsPath.length > 1 &&
    ontologyConfig.baseIRI.length > 1
  ) {
    //if the ontology is hosted at a sub-route
    homeLink = `https://${new URL(ontologyConfig.baseIRI).host}`;
  }
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar>
              <Stack direction={"row"} alignItems={"end"} gap={"16px"}>
                <Link href={homeLink} width={iconSize} height={iconSize}>
                  <Image
                    src="/ontology/uxiverse.svg"
                    alt="Logo"
                    width={iconSize}
                    height={iconSize}
                    priority
                  />
                </Link>
                <Link href={homeLink}>
                  <Typography
                    variant="h6"
                    fontWeight={"800"}
                    fontSize={"20px"}
                    noWrap
                    lineHeight={"1.85"}
                  >
                    {i18nEN.APP_HEADING}
                  </Typography>
                </Link>
                {ontologyConfig.baseNextJsPath?.length > 1 && (
                  <Link href="/">
                    <Typography
                      variant="h6"
                      fontWeight={"800"}
                      fontSize={"12px"}
                      noWrap
                      lineHeight={"28px"}
                      color="HighlightText"
                    >
                      {i18nEN.APP_ONTOLOGY_LINK}
                    </Typography>
                  </Link>
                )}
              </Stack>
            </Toolbar>
          </AppBar>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              ml: `16px`,
              mt: ["48px", "56px", "64px"],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
