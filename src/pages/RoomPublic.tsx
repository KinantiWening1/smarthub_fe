import { Heading, Box, Grid, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useEffect, useState, useRef } from "react";
import RoomCard, { RoomProperty } from "../components/RoomCards";

export default function RoomPublic() {
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
					console.log("Intersecting");
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
			<Navbar status="public" />
			{!isError && roomArray.length !== 0 && (
				<Box margin={50} minH={"calc(100vh)"}>
					<Heading textAlign={"center"} py={8}>
						Fasilitas yang Tersedia
					</Heading>
					<Grid marginX={100} templateColumns={"repeat(3, 1fr)"} gap={10}>
						{roomArray.map((roomData, index) => {
							return <RoomCard cardProperty={roomData} key={index} />;
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
			(
			<Box w={"calc(100vw)"} ref={observerTarget}>
				<Heading fontSize={20} textAlign={"center"} p={4}>
					Is this the end..?
				</Heading>
			</Box>
			)
		</>
	);
}
