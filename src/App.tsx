// Import functions
import AdminPage from "./pages/AdminPage.tsx";
import BookingData from "./pages/BookingData.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MemberData from "./pages/MemberData.tsx";
import RoomData from "./pages/RoomData.tsx";
import RoomDataDetail from "./pages/RoomDataDetail.tsx";
import RoomPublic from "./pages/RoomPublic.tsx";
import RoomPublicDetail from "./pages/RoomPublicDetail.tsx";
import RoomAdd from "./pages/AddRoom.tsx";

// import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme.ts";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function App() {
	return (
		<ChakraProvider theme={theme}>
			<ToastContainer />
			<Router>
				<Routes>
					<Route path="/">
						{/* public routes l*/}
						<Route path="admin" element={<AdminPage />} />
						<Route path="/" element={<LandingPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/roompublic" element={<RoomPublic />} />
						<Route
							path="/roompublicdetail/:id"
							element={<RoomPublicDetail />}
						/>

						{/* admin route */}
						<Route path="/memberdata" element={<MemberData />} />
						<Route path="/bookingdata" element={<BookingData />} />
						<Route path="/roomdata" element={<RoomData />} />
						<Route path="/roomdata/add" element={<RoomAdd />} />
						<Route path="/roomdata/edit/:id" element={<RoomDataDetail />} />
					</Route>
				</Routes>
			</Router>
		</ChakraProvider>
	);
}

export default App;
