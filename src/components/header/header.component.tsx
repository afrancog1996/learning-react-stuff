import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("global_title")}</h1>
    </div>
  );
}

export default Header;
