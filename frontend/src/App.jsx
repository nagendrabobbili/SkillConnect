import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mechanics from "./pages/Mechanics";
import AddMechanic from "./pages/AddMechanic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mechanics" element={<Mechanics />} />
        <Route path="/add-mechanic" element={<AddMechanic />} />

        {/* Edit Mechanic */}
        <Route path="/edit-mechanic/:id" element={<AddMechanic />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;