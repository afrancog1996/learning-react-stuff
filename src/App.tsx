import "./App.css";
import "./helpers/i18n";
import { lazy, Suspense } from "react";

function App() {
  const Header = lazy(() => import("./components/header/header.component"));
  const Main = lazy(() => import("./components/main/main.component"));
  const Footer = lazy(() => import("./components/footer/footer.component"));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <main>
        <Main />
      </main>
      <Footer />
    </Suspense>
  );
}

export default App;
