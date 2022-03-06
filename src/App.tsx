import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import React, { useMemo } from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import Main from "./components/main/main.component";
import "./helpers/i18n";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={darkTheme}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
          <Box gridColumn="span 12">
            <Item>
              <Header />
            </Item>
          </Box>
          <Box gridColumn="span 12">
            <Item>
              <Main />
            </Item>
          </Box>
          <Box gridColumn="span 12">
            <Item>
              <Footer />
            </Item>
          </Box>
        </Box>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
