import { Heading, Box, Grid } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useEffect, useState, useRef } from "react";
import RoomCard, { RoomProperty } from "../components/RoomCards";

export default function RoomPublic() {
	const currentPage = useRef(0);
	const [roomArray, setRoomArray] = useState<RoomProperty[]>([]);
	const [isError, setIsError] = useState(false);
	useEffect(() => {
		fetch(
			`https://smarthubbe-production.up.railway.app/room?page=${currentPage.current}`
		).then((response) => {
			if (response.status !== 200) {
				setIsError(true);
				return;
			}
			response.json().then((responsejson) => {
				const data = responsejson.data;
				setRoomArray([...new Set(roomArray.concat(data))]);
			});
			return;
		});
		// eslint-disable-next-line
	}, [currentPage.current]);
	const roomCardList = roomArray.map((roomData) => {
		return <RoomCard cardProperty={roomData} key={roomData.idRoom} />;
	});
	return (
		<>
			<Navbar status="public" />
			{!isError && (
				<Box margin={50}>
					<Heading textAlign={"center"} py={8}>
						Fasilitas yang Tersedia
					</Heading>
					<Grid marginX={100} templateColumns={"repeat(3, 1fr)"} gap={10}>
						{roomCardList}
					</Grid>
				</Box>
			)}
		</>
	);
}
