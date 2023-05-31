import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Terms from "./routes/Terms";
import Menu from "./routes/Menu";
import Details from "./routes/Details";
import Cart from "./routes/Cart";
import Shipping from "./routes/Shipping";
import Payment from "./routes/Payment";
import Card from "./routes/Card";
import Swish from "./routes/Swish";
import NotFound from "./routes/NotFound";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/terms' element={<Terms />} />
      <Route path='/menu' element={<Menu />} />
      <Route exact path='/menu/:itemTitle' element={<Details />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/shipping' element={<Shipping />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/card' element={<Card />} />
      <Route path='/swish' element={<Swish />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
