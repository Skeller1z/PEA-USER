import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import LoginPage from "../Components/Login/LoginPage";
import MainMap from "../Components/Leaflet/MainMap";

export default function Router() {

  return useRoutes([
    {
      path: "/",
      element: <LoginPage/>,
      
    },
    {
      path: "MainMap",
      element: <MainMap/>,
      
    },
  ]);
}
