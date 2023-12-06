import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	FormControl,
	FormLabel,
	Input,
	useDisclosure,
	FormErrorMessage,
} from '@chakra-ui/react';

import AddPayment from './AddPayment';
import { RoomProperty } from '../utils/types';
import { PropType } from '../utils/types';
import { BookingData } from '../utils/types';

interface AddBookingProps {
	idRoom: PropType<RoomProperty, 'idRoom'>;
	isOpen: boolean;
	onClose: () => void;
}


const AddBooking: React.FC<AddBookingProps> = ({ idRoom, isOpen, onClose }) => {
	const { isOpen: isOpenPayment, onOpen: onOpenPayment, onClose: onClosePayment } = useDisclosure();

	const nameRef = useRef<HTMLInputElement | null>(null);
	const [bookingData, setBookingData] = useState<BookingData>({
		idRoom: idRoom,
		bookerName: '',
		reservedTime: new Date(),
	});

	const [errors, setErrors] = useState({
		errors: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBookingData({ ...bookingData, [e.target.name]: e.target.value });
	};

	const handleDateChange = (date: Date) => {
		setBookingData({ ...bookingData, reservedTime: date });
	};

	const submitBooking = async () => {
		if (bookingData.bookerName === '') {
		  setErrors({ errors: 'Booker Name cannot be empty' });
		  return;
		}
		setErrors({ errors: '' });
	
		try {
		  const formattedData = {
			...bookingData,
			reservedTime: bookingData.reservedTime.toISOString(),
		  };
	
		  const response = await fetch('https://smarthubbe-production.up.railway.app/booking/', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(formattedData),
		  });
	
		  if (response.ok) {
			const responseData = await response.json();
			console.log('Reservation added successfully:', responseData);
			console.log(formattedData);
	
			onClose(); // Close the modal or perform any necessary actions
			onOpenPayment(); // Open payment modal or perform any other action upon successful reservation
		  } else {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to add reservation');
		  }
		} catch (error:any) {
		  console.error('Error adding reservation:', error);
		}
	  };

	return (
		<>
			<Modal initialFocusRef={nameRef} isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontWeight='bold'
						color='#02033B'
						fontFamily='Roboto'
						fontSize='2xl'
						textAlign='center'>
						Booking
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl mt={4} isRequired>
							<FormLabel>ID Room</FormLabel>
							<Input
								value={bookingData.idRoom}
								placeholder='id Room'
								name='idRoom'
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl mt={4} isRequired isInvalid={errors.errors !== ''}>
							<FormLabel>Booker Name</FormLabel>
							<Input
								ref={nameRef}
								value={bookingData.bookerName}
								placeholder='Booker Name'
								name='bookerName'
								onChange={handleChange}
							/>
							<FormErrorMessage>{errors.errors}</FormErrorMessage>
						</FormControl>
						<FormControl mt={4} isRequired>
							<FormLabel>Reserved Time</FormLabel>
							<DatePicker
								selected={bookingData.reservedTime}
								onChange={handleDateChange}
								dateFormat='dd/MM/yyyy'
								wrapperClassName='datePicker'
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={submitBooking}>
							Next
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<AddPayment isOpen={isOpenPayment} onClose={onClosePayment} bookingData={bookingData} />
		</>
	);
};

export default AddBooking;
