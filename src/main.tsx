import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App.tsx";
import theme from "./styles/theme.ts";
import { ToastContainer } from "react-toastify";

import "./index.css";

import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<ToastContainer />
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
