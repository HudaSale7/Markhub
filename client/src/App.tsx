import { Route, Routes } from "react-router-dom";
import Intro from './components/Intro/intro';
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/signUp";
import ProjectSideBar from "./components/ProjectsSideBar/ProjectSideBar";
import Project from "./components/Project/Project";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Intro />} />
      <Route element={<NavBar/> }>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route element={<ProjectSideBar />}>
          <Route path="/project/:id" element={ <Project/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
