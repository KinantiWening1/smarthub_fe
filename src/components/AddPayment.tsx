import React, { useRef, useState } from 'react';
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
} from '@chakra-ui/react';
import { BookingData } from '../utils/types';

interface AddPaymentProps {
	isOpen: boolean;
	onClose: () => void;
	bookingData: BookingData;
}

interface PaymentData {
	paymentId: string;
	norek: string;
}

const AddPayment: React.FC<AddPaymentProps> = ({ isOpen, onClose, bookingData }) => {
	const initialRef = useRef<HTMLInputElement | null>(null);
	const [paymentData, setPaymentData] = useState<PaymentData>({
		paymentId: '',
		norek: '',
	});

	const customButtonStyle = {
		backgroundColor: '#6878F4',
		color: 'white',
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
	};

	const submitPayment = () => {
		const combinedData = {
			...bookingData,
			...paymentData,
		};

		console.log(combinedData);
		onClose();
	};

	return (
		<>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontWeight='bold'
						color='#02033B'
						fontFamily='Roboto'
						fontSize='2xl'
						textAlign='center'>
						Payment
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl mt={4} isRequired>
							<FormLabel>Payment ID</FormLabel>
							<Input
								ref={initialRef}
								value={paymentData.paymentId}
								placeholder='Payment ID'
								name='paymentId'
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl mt={4} isRequired>
							<FormLabel>No Rekening</FormLabel>
							<Input
								value={paymentData.norek}
								placeholder='No Rek'
								name='norek'
								onChange={handleChange}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={submitPayment} style={customButtonStyle}>
							Submit
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddPayment;
