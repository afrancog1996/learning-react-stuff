import { HashRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import Main from "./components/main/main.component";
import "./helpers/i18n";

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
