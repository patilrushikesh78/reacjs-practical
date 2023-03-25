import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllTabs from "./components/Screens/Home";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AllTabs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
