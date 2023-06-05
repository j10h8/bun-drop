import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./routes/Home";
import About from "./routes/About";
import Terms from "./routes/Terms";
import Menu from "./routes/Menu";
import Cart from "./routes/Cart";
import Shipping from "./routes/Shipping";
import Billing from "./routes/Billing";
import Card from "./routes/Card";
import Swish from "./routes/Swish";
import NotFound from "./routes/NotFound";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/billing' element={<Billing />} />
        <Route path='/card' element={<Card />} />
        <Route path='/swish' element={<Swish />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
