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
  ChakraProvider,
  extendTheme,
  useDisclosure
} from '@chakra-ui/react';
import AddPayment from './Payment';

const theme = extendTheme({
  fonts: {
    body: 'Roboto Bold, sans-serif',
  },
});

interface AddBookingProps {
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
  };
  moveToPayment: () => void; // Function to move to Payment component
  submitFunction: (bookingData: any) => void;
}

const AddBooking: React.FC<AddBookingProps> = ({ disclosure, submitFunction, moveToPayment }) => {
  const { isOpen, onClose } = disclosure;
  const { isOpen:isopenpayment, onClose:onclosepayment} = useDisclosure();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const [bookingData, setBookingData] = useState({
    idRoom: '',
    bookerName: '',
    reservedTime: new Date()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date) => {
    setBookingData({ ...bookingData, reservedTime: date });
  };

  const submitBooking = async() => {
    await fetch(`http://localhost:5001/booking/`, {
        method: "POST",
        headers: {
          // Authorization: token,
        },
      });
    submitFunction(bookingData);
    moveToPayment(); // Move to Payment component
  };

  return (
    <ChakraProvider theme={theme}>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold" color="#02033B" fontFamily="Roboto" fontSize="2xl" textAlign="center">
            Booking
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} isRequired>
              <FormLabel>ID Room</FormLabel>
              <Input ref={initialRef} placeholder="id Room" name="idRoom" onChange={handleChange} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Booker Name</FormLabel>
              <Input ref={initialRef} placeholder="Booker Name" name="bookerName" onChange={handleChange} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Reserved Time</FormLabel>
              <DatePicker
                selected={bookingData.reservedTime}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                wrapperClassName="datePicker"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitBooking}>
              Next
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AddPayment isOpen={isopenpayment} onClose={onclosepayment} bookingData={bookingData} submitPaymentFunction={()=>submitBooking()} />
    </ChakraProvider>
  );
};

export default AddBooking;
