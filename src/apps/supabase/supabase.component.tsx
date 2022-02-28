import { useTranslation } from "react-i18next";

function SupaBase() {
  const { t } = useTranslation();

  return (
    <div>
      Hello from Supabase!
    </div>
  );
}

export default SupaBase;
