import { Heading, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ThreeRoomCards from "../components/RoomCards";
import CreateRoom from "../components/modalCreateRoom";

export default function RoomDate() {
	return (
		<>
			<Navbar status="public" />
			<VStack justifyContent={"center"}>
				<Heading textAlign={"center"} py={8}>
					Fasilitas yang Dimiliki
				</Heading>
				<CreateRoom />
			</VStack>
		</>
	);
}
