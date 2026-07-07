import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mechanics from "./pages/Mechanics";
import AddMechanic from "./pages/AddMechanic";
import MechanicDetails from "./pages/MechanicDetails";
import MechanicMap from "./pages/MechanicMap";
import BookMechanic from "./pages/BookMechanic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mechanics" element={<Mechanics />} />
        <Route path="/add-mechanic" element={<AddMechanic />} />
        <Route 
 path="/mechanics/:id" 
 element={<MechanicDetails />} 
/>
<Route 
 path="/map" 
 element={<MechanicMap />} 
/>
<Route 
 path="/book-mechanic/:id" 
 element={<BookMechanic />} 
/>

        {/* Edit Mechanic */}
        <Route path="/edit-mechanic/:id" element={<AddMechanic />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;