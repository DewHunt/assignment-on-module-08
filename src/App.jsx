import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ExpencePage from "./pages/ExpencePage";
import HomePage from "./pages/HomePage";
import IncomePage from "./pages/IncomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/income/" element={<IncomePage />} />
          <Route path="/expences/" element={<ExpencePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
