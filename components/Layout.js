import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Search from "./Search";
import { indigo } from "@mui/material/colors";

export default function Layout({ children }) {
  return (
    <Box m={0} bgcolor={indigo[100]} minHeight="100vh">
      <Container
        maxWidth="sm"
        sx={{ backgroundColor: "white", minHeight: "100vh" }}>
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
