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
} from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Roboto Bold, sans-serif',
  },
});

interface AddBookingAdminProps {
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
  };
  submitFunction: (bookingData: any) => void;
}

const AddBookingAdmin: React.FC<AddBookingAdminProps> = ({ disclosure, submitFunction }) => {
  const { isOpen, onClose } = disclosure;
  const initialRef = useRef<HTMLInputElement | null>(null);
  const [bookingData, setBookingData] = useState({
    idRoom: '',
    bookerName: '',
    reservedTime: new Date(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date) => {
    setBookingData({ ...bookingData, reservedTime: date });
  };

  const submitClose = () => {
    submitFunction(bookingData);
    onClose();
  };

  return (
    <ChakraProvider theme={theme}>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold" color="#02033B" fontFamily="Roboto" fontSize="2xl" textAlign="center">
            Reservasi Ruangan
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} isRequired>
              <FormLabel>ID Room</FormLabel>
              <Input
                ref={initialRef}
                placeholder="id Room"
                name="idRoom"
                onChange={handleChange}
                value={bookingData.idRoom}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Booker Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Booker Name"
                name="bookerName"
                onChange={handleChange}
                value={bookingData.bookerName}
              />
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
            <Button colorScheme="purple" mr={3} type="submit" onClick={submitClose}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default AddBookingAdmin;
