// import FormCreation from "./FormCreation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import FormBuilder from "./components/FormBuilder";
import FormCreation from "./pages/FormCreation";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<FormCreation/>} />
          <Route path="/form-builder" element={<FormBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
