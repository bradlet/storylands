import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppWithWalletContext from "./AppWithWalletContext";

export const LOCAL_NET = "http://127.0.0.1:8899";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AppWithWalletContext />
	</React.StrictMode>
);
