import "./App.css";
import "./helpers/i18n";
import { lazy, Suspense } from "react";
import { BrowserRouter , HashRouter} from "react-router-dom";
import Header from "./components/header/header.component";
import Main from "./components/main/main.component";
import Footer from "./components/footer/footer.component";

function App() {
  return (
    <HashRouter>
      <Header />
      <main>
        <Main />
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;
