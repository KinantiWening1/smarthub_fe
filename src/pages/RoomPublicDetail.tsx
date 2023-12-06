import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Flex, Heading, Text, Image, VStack, Button, HStack, useDisclosure } from '@chakra-ui/react';
import { RoomProperty } from '../utils/types';

import Navbar from '../components/Navbar';
import AddBooking from '../components/AddBooking';

export default function RoomPublicDetail() {
	const router = useNavigate();
	const { idRoom } = useParams() as { idRoom: string };

	const [roomData, setRoomData] = useState<RoomProperty | null>(null);
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const customButtonStyle = {
		backgroundColor: '#6878F4',
		color: 'white',
	};

	useEffect(() => {
		if (idRoom === null) return;

		setIsLoading(true);
		setIsError(false);
		fetch(`https://smarthubbe-production.up.railway.app/room/${idRoom}`)
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
	}, [idRoom]);

	return (
		<>
			<Navbar status='public' />

			{!isError && !isLoading && roomData !== null && (
				<Flex flexDirection={'column'} alignContent={'center'} padding={20} paddingTop={10} gap={10}>
					<Button
						rounded={'full'}
						w='5em'
						h='5em'
						onClick={(e) => {
							e.preventDefault();
							router('/roompublic');
						}}>
						<IoMdArrowBack size='2em' />
					</Button>
					<Heading fontSize={50}>{roomData.roomName}</Heading>
					<Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
						<Image
							src='/room1.jpg'
							w={'calc(100vw)'}
							h={'calc(80vh)'}
							objectFit={'cover'}
							objectPosition={'center'}
							rounded={'lg'}
						/>
					</Flex>
					<Text
						minHeight={'calc(50vh)'}
						fontSize={22}
						colorScheme='twitter'
						size={'lg'}
						p={5}
						textAlign={'justify'}
						backgroundColor={'#DFDFDF'}
						rounded={'xl'}>
						{roomData.description}
					</Text>
					<VStack
						backgroundColor={'#DFDFDF'}
						p={10}
						rounded={'xl'}
						justifyContent={'flex-start'}
						alignContent={'start'}
						gap={10}>
						<HStack gap={10} fontSize={20} w={'100%'}>
							<Text display={'inline-block'} fontWeight={'medium'} w={'10%'}>
								Status
							</Text>
							<Text display={'inline-block'} fontWeight={'bold'}>
								{roomData.availability}
							</Text>
						</HStack>
						<HStack gap={10} fontSize={20} w={'100%'}>
							<Text display={'inline-block'} fontWeight={'medium'} w={'10%'}>
								Price
							</Text>
							<Text display={'inline-block'} fontWeight={'bold'}>
								Rp. {roomData.price}
							</Text>
						</HStack>
						<Button
							width={'50%'}
							colorScheme='blue'
							textColor={'white'}
							onClick={() => onOpen()}
							style={customButtonStyle}>
							Book Now!
						</Button>
					</VStack>
				</Flex>
			)}

			{!isError && isLoading && roomData === null && (
				<Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} height={'calc(100vh)'}>
					<Heading textAlign={'center'} fontSize={50}>
						Loading...
					</Heading>
				</Flex>
			)}

			{isError && (
				<Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} height={'calc(100vh)'}>
					<Heading textAlign={'center'} fontSize={50}>
						Something went wrong...
					</Heading>
				</Flex>
			)}

			<AddBooking isOpen={isOpen} onClose={onClose} idRoom={Number.parseInt(idRoom)} />
		</>
	);
}
