import { useTranslation } from "react-i18next";

function Welcome() {
  const { t } = useTranslation();

  return (
    <div>
      Hello from welcome!
    </div>
  );
}

export default Welcome;
