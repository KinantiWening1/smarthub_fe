import {
	Box,
	useColorModeValue,
	Heading,
	Text,
	Stack,
	Image,
	Button,
} from "@chakra-ui/react";
import { FC } from "react";

import { Link as RouterLink } from "react-router-dom";

const IMAGE = "/room1.jpg";

const customButtonStyle = {
	backgroundColor: "#6878F4",
	color: "white",
};
export interface RoomProperty {
	idRoom: number;
	roomName: string;
	roomType: string;
	roomSize: number;
	capacity: number;
	availability: string;
	price: number;
	description: string;
}
export interface CardProps {
	cardProperty: RoomProperty;
	redirectLink: string;
}
const RoomCards: FC<CardProps> = ({ cardProperty, redirectLink }) => {
	return (
		<Box
			role={"group"}
			p={6}
			bg={useColorModeValue("white", "gray.800")}
			boxShadow={"2xl"}
			rounded={"lg"}
			zIndex={1}
			justifyContent={"center"}
			alignItems={"center"}
			display={"flex"}
			flexDir={"column"}
		>
			<Box rounded={"lg"} height={"230px"}>
				<Image
					rounded={"lg"}
					height={230}
					width={"100%"}
					objectFit={"cover"}
					src={IMAGE}
					alt="#"
				/>
			</Box>
			<Stack pt={10} align={"center"}>
				<Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
					{cardProperty.roomType}
				</Text>
				<Heading
					fontSize={"2xl"}
					fontFamily={"body"}
					fontWeight={800}
					color={"blue"}
					textAlign={"center"}
				>
					{cardProperty.roomName}
				</Heading>
				<Stack direction={"row"} align={"center"}>
					<Text fontWeight={500} fontSize={"xl"}>
						Rp{cardProperty.price}
					</Text>
				</Stack>
				<Button
					colorScheme="blue"
					as={RouterLink}
					to={`/${redirectLink}/` + cardProperty.idRoom}
					style={customButtonStyle}
				>
					Lihat Details
				</Button>
			</Stack>
		</Box>
	);
};
export default RoomCards;
