import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './Home';
import UserInputs from './Pages/UserInputs';
import DisplayUtvonalak from './Pages/DisplayUtvonalak';
import AddCar from './Pages/AddCar';

function App() {
  const location = useLocation();
  return (
  <div>
  
    <Routes location={location} key={location.pathname}>
      <Route exact path="/" element={<Home />} />
      <Route path="/userinputs" element={<UserInputs />} />
      <Route path="/listvehicles" element={<DisplayUtvonalak />} />
      <Route path="/addcar" element={<AddCar />} />
    </Routes>
    </div>
  );
}

export default App;