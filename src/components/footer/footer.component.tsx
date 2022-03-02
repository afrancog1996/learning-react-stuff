import "./footer.component.css";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return <div className="footer">{t("author_name")}</div>;
}

export default Footer;
