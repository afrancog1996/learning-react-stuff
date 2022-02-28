import "./App.css";
import "./helpers/i18n";
import { lazy, Suspense } from "react";

function App() {
  const Header = lazy(() => import('./components/header/header.component'));

  return <Suspense fallback={<div>Loading...</div>}>
      <Header />
  </Suspense>
}

export default App;
