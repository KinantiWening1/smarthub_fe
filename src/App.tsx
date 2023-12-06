import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminPage from './pages/AdminPage.tsx';
import BookingData from './pages/BookingData.tsx';
import LandingPage from './pages/LandingPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import MemberData from './pages/MemberData.tsx';
import RoomData from './pages/RoomData.tsx';
import RoomPublic from './pages/RoomPublic.tsx';
import RoomPublicDetail from './pages/RoomPublicDetail.tsx';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/admin' element={<AdminPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/roompublic' element={<RoomPublic />} />
				<Route path='/roompublicdetail/:idRoom' element={<RoomPublicDetail />} />

				{/* admin route */}
				<Route path='/memberdata' element={<MemberData />} />
				<Route path='/bookingdata' element={<BookingData />} />
				<Route path='/roomdata' element={<RoomData />} />
			</Routes>
		</Router>
	);
}

export default App;
