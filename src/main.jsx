import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { router } from "./app/router";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CssBaseline />
        <RouterProvider router={router} />
    </React.StrictMode>
);
