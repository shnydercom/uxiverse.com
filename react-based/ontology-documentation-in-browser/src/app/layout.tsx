import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import type { Metadata } from 'next'
import { i18nEN } from '@/i18n'

export const metadata: Metadata = {
  title: 'Uxiverse.com ontology',
  description: 'Structured Relationships between Digital User Interface Components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar>
              <Typography variant="h6" fontWeight={"800"} fontSize={"20"} noWrap component="div" >
                {i18nEN.APP_HEADING}
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: `16px`,
              mt: ['48px', '56px', '64px'],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  )
}
