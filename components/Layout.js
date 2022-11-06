import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Search from "./Search";

export default function Layout({ children }) {
  return (
    <Box m={0}>
      <Container maxWidth="sm">
        <Stack
          py={{ xs: 2, md: 4 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Link href="/">
            <Typography
              level="display2"
              component="h1"
              fontWeight="bold"
              sx={{ fontSize: { xs: "1.2rem", sm: "2rem" } }}>
              Swanky
            </Typography>
          </Link>
          <Search />
        </Stack>
        {children}
      </Container>
    </Box>
  );
}
