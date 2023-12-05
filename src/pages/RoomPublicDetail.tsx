import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Flex, Heading, Text, Image } from "@chakra-ui/react";
import { RoomProperty } from "../components/RoomCards";
export default function RoomPublicDetail() {
	const [roomData, setRoomData] = useState<RoomProperty | null>(null);
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const params = useParams();
	useEffect(() => {
		if (params.id === null) return;
		setIsLoading(true);
		setIsError(false);
		fetch(`https://smarthubbe-production.up.railway.app/room/${params.id}`)
			.then((response) => {
				if (response.status !== 200) {
					setIsError(true);
					return;
				}
				response.json().then((responsejson) => {
					setRoomData(responsejson);
				});
				return;
			})
			.catch((err) => {
				console.error(err);
				setIsError(true);
				return;
			});
		setIsLoading(false);
	}, [params.id]);
	return (
		<>
			<Navbar status="public" />
			{!isError && !isLoading && roomData !== null && (
				<Flex
					flexDirection={"column"}
					alignContent={"center"}
					padding={20}
					gap={10}
				>
					<Heading fontSize={50}>{roomData.roomName}</Heading>
					<Flex
						flexDir={"column"}
						alignItems={"center"}
						justifyContent={"center"}
					>
						<Image
							src="/room1.jpg"
							w={"calc(100vw)"}
							h={"calc(50vh)"}
							objectFit={"cover"}
							objectPosition={"center"}
							rounded={"lg"}
						/>
					</Flex>
					<Text
						height={"calc(50vh)"}
						fontSize={25}
						colorScheme="twitter"
						size={"lg"}
						p={5}
						textAlign={"justify"}
					>
						{roomData.description}
					</Text>
				</Flex>
			)}
			{!isError && isLoading && roomData === null && (
				<Flex
					flexDir={"column"}
					alignItems={"center"}
					justifyContent={"center"}
					height={"calc(100vh)"}
				>
					<Heading textAlign={"center"} fontSize={50}>
						Loading...
					</Heading>
				</Flex>
			)}
			{isError && (
				<Flex
					flexDir={"column"}
					alignItems={"center"}
					justifyContent={"center"}
					height={"calc(100vh)"}
				>
					<Heading textAlign={"center"} fontSize={50}>
						Something went wrong...
					</Heading>
				</Flex>
			)}
		</>
	);
}
