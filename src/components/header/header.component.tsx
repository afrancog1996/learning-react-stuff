import LanguageIcon from "@mui/icons-material/Language";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import i18next from "i18next";
import * as React from "react";
import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (code: string) => {
    i18next.changeLanguage(code);
    setAnchorEl(null);
  };

  const languages = {
    en: {
      name: "English",
      code: "en",
    },
    es: {
      name: "Español",
      code: "es",
    },
  };

  useEffect(() => {}, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box sx={{ flexGrow: 1 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={handleChange}
                aria-label="login switch"
              />
            }
            label={auth ? "Logout" : "Login"}
          />
        </FormGroup>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button href="/"> {t("global_title")}</Button>
            </Typography>
            <Button size="small" href="/spotify-app">
              {t("spotify_title")}
            </Button>
            <Button size="small" href="/supabase-app">
              {t("supabase_title")}
            </Button>
            <Button size="small" href="/instagram-clone">
              {t("instagram_title")}
            </Button>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                  sx={{ mr: 2 }}
                >
                  <LanguageIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={(e: any) => {
                      handleClose(languages?.es?.code);
                    }}
                  >
                    {languages.es.name}
                  </MenuItem>
                  <MenuItem
                    onClick={(e: any) => {
                      handleClose(languages?.en?.code);
                    }}
                  >
                    {languages.en.name}
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Suspense>
  );
}

export default Header;
