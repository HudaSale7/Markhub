import { Route, Routes } from "react-router-dom";
import Intro from "./components/Intro/intro";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ProjectSideBar from "./components/ProjectsSideBar/ProjectSideBar";
import Project from "./components/Project/Project";
import { ThemeProvider } from "@/components/theme/theme-provider";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route element={<ProjectSideBar />} path="/project">
            <Route path="/project/:id" element={<Project />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
