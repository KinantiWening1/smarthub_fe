import { Heading, HStack, Grid, Flex, Button, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useEffect, useState, useRef } from "react";
import RoomCard, { RoomProperty } from "../components/RoomCards";
import { IoMdArrowBack, IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function RoomPublic() {
	const router = useNavigate();
	const page = useRef(0);
	const observerTarget = useRef(null);
	const [roomArray, setRoomArray] = useState<RoomProperty[]>([]);
	const [isError, setIsError] = useState<boolean>(false);
	const [isEnd, setIsEnd] = useState<boolean>(false);

	const fetchData = (pageInput: number) => {
		setIsError(false);
		fetch(`https://smarthubbe-production.up.railway.app/room?page=${pageInput}`)
			.then((response) => {
				if (response.status !== 200) {
					setIsError(true);
					return;
				}
				response.json().then((responsejson) => {
					const data = responsejson.data;
					if (data.length === 0) {
						setIsEnd(true);
						return;
					}
					setRoomArray((current) => {
						return current.concat(data);
					});
					return;
				});
				return;
			})
			.catch((err) => {
				console.error(err);
				setIsError(true);
				return;
			});
	};

	useEffect(() => {
		fetchData(page.current);
	}, []);

	useEffect(() => {
		if (isEnd || isError) return;
		const currentElement = observerTarget.current;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchData(page.current + 1);
					page.current++;
				}
			},
			{ threshold: 0.05 }
		);
		if (currentElement) observer.observe(currentElement);
		return () => {
			//eslint-disable-next-line
			if (currentElement) observer.unobserve(currentElement);
		};
	}, [observerTarget, isError, isEnd]);
	return (
		<>
			<Navbar status="admin" />
			<HStack p={10} pb={0} justifyContent={"space-between"}>
				<Button
					rounded={"full"}
					w="5em"
					h="5em"
					onClick={(e) => {
						e.preventDefault();
						//Change this later
						router("/roompublic");
					}}
				>
					<IoMdArrowBack size="2em" />
				</Button>
				<Button
					rounded={"full"}
					w="5em"
					h="5em"
					onClick={(e) => {
						e.preventDefault();
						router("/roomdata/add");
					}}
				>
					<IoMdAdd size="2em" />
				</Button>
			</HStack>
			{!isError && roomArray.length !== 0 && (
				<Box margin={50} marginTop={0} minH={"calc(100vh)"}>
					<Heading textAlign={"center"} py={8}>
						Fasilitas yang Tersedia
					</Heading>
					<Grid marginX={100} templateColumns={"repeat(3, 1fr)"} gap={10}>
						{roomArray.map((roomData, index) => {
							return (
								<RoomCard
									redirectLink="roomdata/edit"
									cardProperty={roomData}
									key={index}
								/>
							);
						})}
					</Grid>
				</Box>
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
			<Box w={"calc(100vw)"} ref={observerTarget}>
				<Heading fontSize={20} textAlign={"center"} p={4}>
					Is this the end..?
				</Heading>
			</Box>
		</>
	);
}
