import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div>
      Hello from footer!
    </div>
  );
}

export default Footer;
