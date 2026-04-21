import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import "./index.css";

async function main() {
    // Запускаем MSW только в dev-режиме
    if (import.meta.env.DEV) {
        const { worker } = await import("./mocks/browser");
        await worker.start({
            onUnhandledRequest: "bypass", // не ругаться на незамоканные запросы
        });
    }

    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

main();