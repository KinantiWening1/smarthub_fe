import { Heading, HStack, Grid, Flex, Button, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useEffect, useState, useRef } from "react";
import RoomCard, { RoomProperty } from "../components/RoomCards";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function RoomPublic() {
	const router = useNavigate();
	const page = useRef(0);
	const observerTarget = useRef(null);
	const [roomArray, setRoomArray] = useState<RoomProperty[]>([]);
	const [isError, setIsError] = useState<boolean>(false);
	const [isEnd, setIsEnd] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(false); 
	const hasFetchedInitialData = useRef(false); // Ref to track initial fetch

	const fetchData = (pageInput=0) => {
        if (isLoading) return; // Prevent fetching if already loading
        setIsLoading(true);
        setIsError(false);
        fetch(`https://smarthubbe-production.up.railway.app/room?page=${pageInput}`)
            .then(response => {
                if (response.status !== 200) {
                    setIsError(true);
                    setIsLoading(false);
                    return;
                }
                return response.json();
            })
            .then(responsejson => {
                if (responsejson && responsejson.data) {
                    const data = responsejson.data;
                    if (data.length === 0) {
                        setIsEnd(true);
                    } else {
                        setRoomArray(current => [...new Set(current.concat(data))]);
                    }
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsError(true);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!hasFetchedInitialData.current) {
            console.log("Initial Fetch");
            fetchData();
            hasFetchedInitialData.current = true;
        }
    }, []);

    useEffect(() => {
        if (isEnd || isError || isLoading) return;

        const currentElement = observerTarget.current;
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log("Intersection Observer Triggered");
                fetchData(page.current + 1);
                page.current++;
            }
        }, { threshold: 0.1 });

        if (currentElement) observer.observe(currentElement);

        return () => {
            if (currentElement) observer.unobserve(currentElement);
        };
    }, [observerTarget, isError, isEnd, isLoading]);
	
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
						router("/roompublic");
					}}
				>
					<IoMdArrowBack size="2em" />
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
									redirectLink="roompublicdetail"
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
