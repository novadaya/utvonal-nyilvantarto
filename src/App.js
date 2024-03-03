import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import Home from './Pages/Home';
import UserInputs from './Pages/UserInputs';
import ListVehicles from './Pages/ListVehicles';

function App() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="userinputs" element={<UserInputs />} />
        <Route path="listvehicles" element={<ListVehicles />} />
    </Routes>
  );
}

export default App;
