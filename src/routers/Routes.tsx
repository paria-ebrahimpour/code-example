import { PathRouteProps } from "react-router-dom";
import HomePage from "../pages/home";
import DashboardPage from "../pages/dashboard";
import LoginPage from "../pages/login";

interface IRoute extends PathRouteProps {
  name: string;
  exact?: boolean;
}

export const ProjectRoutes: IRoute[] = [
  {
    path: "/",
    name: "HomePage",
    element: <HomePage />,
    exact: true,
  },
  {
    path: "/account/login",
    name: "Login",
    element: <LoginPage />,
    exact: true,
  },
];

export const PrivateRoutes: IRoute[] = [
  {
    path: "/my-cart",
    name: "dashboard",
    element: <DashboardPage />,
    exact: true,
  },
];
