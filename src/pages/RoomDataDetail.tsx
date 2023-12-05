import {
	Heading,
	HStack,
	Flex,
	Button,
	Box,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Image,
	Stack,
	Text,
	Textarea,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { RoomProperty } from "../components/RoomCards";

export default function RoomPublic() {
	const [roomName, setRoomName] = useState("");
	const [roomSize, setRoomSize] = useState("");
	const [capacity, setCapacity] = useState("");
	const [availability, setAvailability] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [roomType, setRoomType] = useState("");
	const [priceFocus, setPriceFocus] = useState(false);

	const router = useNavigate();
	const params = useParams();
	const deleteRoom = async () => {
		if (params.id === undefined || params.id === null) {
			toast.error("Param ID is not found");
			return;
		}
		const request = await fetch(
			"https://smarthubbe-production.up.railway.app/room/" + params.id,
			{
				method: "DELETE",
			}
		)
			.then((response) => response)
			.catch((err) => err);
		if (request.status !== 200 || request instanceof Error) {
			toast.error("Failed to delete room");
			return;
		}
		toast.success("Deleted room!");
		router("/roomdata");
		return;
	};
	const UpdateRoom = async () => {
		if (params.id === undefined || params.id === null) {
			toast.error("Param ID is not found");
			return;
		}
		const priceParsed = parseInt(price, 10);
		const capacityParsed = parseInt(capacity, 10);
		const roomsizeParsed = parseInt(roomSize, 10);
		if (priceParsed < 0 || capacityParsed < 0 || roomsizeParsed < 0) {
			toast.error("Values cannot be less than 0");
			return;
		}
		const requestBody = {
			roomName,
			roomType,
			roomSize: roomsizeParsed,
			capacity: capacityParsed,
			availability,
			price: priceParsed,
			description,
		};
		const requestBodyJson = JSON.stringify(requestBody);
		const request = await fetch(
			"https://smarthubbe-production.up.railway.app/room/" + params.id,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: requestBodyJson,
			}
		)
			.then((response) => response)
			.catch((err) => err);
		if (request.status !== 200 || request instanceof Error) {
			toast.error("Failed to create new room");
			return;
		}
		toast.success("Created a new room!");
		router("/roomdata");
		return;
	};
	useEffect(() => {
		if (params.id === undefined || params.id === null) {
			toast.error("No ID is provided.");
			return;
		}
		fetch(
			"https://smarthubbe-production.up.railway.app/room/" + params.id
		).then((response) => {
			if (response.status !== 200) {
				toast.error("Provided ID is not found");
				return;
			}
			response.json().then((responsejson: RoomProperty) => {
				setRoomName(responsejson.roomName);
				setRoomSize(responsejson.roomSize.toString());
				setCapacity(responsejson.capacity.toString());
				setAvailability(responsejson.availability);
				setPrice(responsejson.price.toString());
				setDescription(responsejson.description);
				setRoomType(responsejson.roomType);
			});
			return;
		});
	}, [params.id]);
	return (
		<>
			<Navbar status="public" />
			<HStack p={10} pb={0} justifyContent={"space-between"}>
				<Button
					rounded={"full"}
					w="5em"
					h="5em"
					onClick={(e) => {
						e.preventDefault();
						//Change this later
						router("/roomdata");
					}}
				>
					<IoMdArrowBack size="2em" />
				</Button>
			</HStack>
			<Flex minH={"calc(100vh)"} alignItems={"center"} flexDir={"column"}>
				<Heading>Create New Room</Heading>
				<HStack justifyContent={"space-evenly"} w="100%" p={20} gap={20}>
					<FormControl
						bgColor={"#FFFFFF"}
						h="100%"
						p={10}
						rounded="xl"
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<VStack gap={10}>
							<Input
								required
								type="text"
								placeholder="Room Name"
								value={roomName}
								onChange={(e) => setRoomName(e.target.value)}
							/>
							<Input
								required
								type="text"
								placeholder="Room Type"
								value={roomType}
								onChange={(e) => setRoomType(e.target.value)}
							/>
							<HStack justifyContent={"space-between"} w={"100%"}>
								<FormLabel w={"7rem"} mb={0}>
									Room Size
								</FormLabel>
								<Input
									min={0}
									required
									type="number"
									value={roomSize}
									onChange={(e) => setRoomSize(e.target.value)}
								/>
							</HStack>

							<HStack justifyContent={"space-between"} w={"100%"}>
								<FormLabel w={"7rem"} mb={0}>
									Capacity
								</FormLabel>
								<Input
									min={0}
									required
									type="number"
									value={capacity}
									onChange={(e) => setCapacity(e.target.value)}
								/>
							</HStack>
							<Input
								required
								type="text"
								placeholder="Availability"
								value={availability}
								onChange={(e) => setAvailability(e.target.value)}
							/>
							<HStack justifyContent={"space-between"} w={"100%"}>
								<FormLabel w={"7rem"} mb={0}>
									Price
								</FormLabel>
								<Flex
									flexDir={"row"}
									gap={1}
									border={priceFocus ? "2px" : "1px"}
									w={"100%"}
									paddingX={3}
									rounded={"lg"}
									borderColor={priceFocus ? "blueviolet" : "inherit"}
								>
									<Text as="span" marginY={"auto"}>
										Rp.
									</Text>
									<Input
										required
										min={0}
										m={1}
										focusBorderColor="#FFFFFF"
										border={"none"}
										type="number"
										value={price}
										onFocus={() => setPriceFocus(true)}
										onBlur={() => setPriceFocus(false)}
										onChange={(e) => {
											setPrice(e.target.value);
										}}
									/>
								</Flex>
							</HStack>
							<Textarea
								placeholder="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Textarea>
							<HStack w="50%">
								<Input
									type="submit"
									value={"Update"}
									bgColor={"blue"}
									textColor={"white"}
									w={"50%"}
									rounded={"xl"}
									onClick={(e) => {
										e.preventDefault();
										UpdateRoom();
									}}
								/>
								<Input
									type="submit"
									value={"Delete"}
									bgColor={"red"}
									textColor={"white"}
									w={"50%"}
									rounded={"xl"}
									onClick={(e) => {
										e.preventDefault();
										deleteRoom();
									}}
								/>
							</HStack>
						</VStack>
					</FormControl>
					<Box
						role={"group"}
						p={6}
						bg={"white"}
						boxShadow={"2xl"}
						rounded={"lg"}
						zIndex={1}
						justifyContent={"center"}
						alignItems={"center"}
						display={"flex"}
						flexDir={"column"}
					>
						<Box rounded={"lg"} height={"230px"} w={"300px"}>
							<Image
								rounded={"lg"}
								height={230}
								width={"100%"}
								objectFit={"cover"}
								src={"/room1.jpg"}
								alt="#"
							/>
						</Box>
						<Stack pt={10} align={"center"}>
							<Text
								color={"gray.500"}
								fontSize={"sm"}
								textTransform={"uppercase"}
							>
								{roomType}
							</Text>
							<Heading
								fontSize={"2xl"}
								fontFamily={"body"}
								fontWeight={800}
								color={"blue"}
								textAlign={"center"}
							>
								{roomName}
							</Heading>
							<Stack direction={"row"} align={"center"}>
								<Text fontWeight={500} fontSize={"xl"}>
									Rp. {price}
								</Text>
							</Stack>
							<Button
								colorScheme="blue"
								style={{
									backgroundColor: "#6878F4",
									color: "white",
								}}
							>
								Lihat Details
							</Button>
						</Stack>
					</Box>
				</HStack>
			</Flex>
		</>
	);
}
