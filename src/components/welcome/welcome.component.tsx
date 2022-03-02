import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";

function Welcome() {
  const { t } = useTranslation();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {t("welcome")}
        </Typography>
        <Typography variant="h5" component="div">
          {t("global_title")}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <a className='App-link' target='_blank' rel='noreferrer' href="https://github.com/afrancog1996/learning-react-stuff.git">{t("git")}</a>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Welcome;
