import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Todo from "./components/Todo";
import Nav from "./components/navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute element={<Todo />} />} />
    </Routes>
  </BrowserRouter>
);
export default App;
