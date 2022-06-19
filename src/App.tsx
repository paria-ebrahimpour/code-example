import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./styles/index.scss";
import { PrivateRoutes, ProjectRoutes } from "./routers/Routes";
import MainNavbar from "./components/layouts/NavBar";
import TokenServices from "./services/token.service";

function App() {
  return (
    <div>
      <MainNavbar />
      <Routes>
        {ProjectRoutes.map((el) => (
          <Route key={el.name} {...el} />
        ))}
        {PrivateRoutes.map((el) => {
          return (
            <Route
              exact
              key={el.name}
              {...el}
              element={
                !TokenServices.isLoggedIn() ? <Navigate to="/" /> : el.element
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
