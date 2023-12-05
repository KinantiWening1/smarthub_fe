import React, { useRef, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useLocation } from "react-router-dom";
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
    extendTheme
  } from '@chakra-ui/react';

  const theme = extendTheme({
    fonts: {
      body: 'Roboto Bold, sans-serif',
    },
  });

interface UpdateBookingProps {
    disclosure: {
        isOpenUpdate: boolean;
        onCloseUpdate: () => void;
    }
}

const UpdateBooking: React.FC<UpdateBookingProps> = ({ disclosure }) => {
    const { isOpenUpdate, onCloseUpdate } = disclosure;
    const initialRef = useRef<HTMLInputElement | null>(null);
    const [bookingData, setBookingData] = useState({
        idRoom: '',
        bookerName: '',
        reservedTime: new Date()

    });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    

    const handleUpdate = async () => {
        fetch("https://smarthubbe-production.up.railway.app/booking/" + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(bookingData),
            }).then((response) => {
			if (response.status !== 200) {
				console.log("Failed to update");
				return;
			}
			return;
		})
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e && e.target) {
        const { name, value } = e.target;
        setBookingData({ ...bookingData, [name]: value });
      }
    };

    const handleDateChange = (date: Date) => {
      setBookingData({ ...bookingData, reservedTime: date });
    };

    const [isError, setIsError] = useState(false);
    useEffect(() => {
		fetch(
			`https://smarthubbe-production.up.railway.app/booking/` + id
		).then((response) => {
			if (response.status !== 200) {
				setIsError(true);
				return;
			}
			response.json().then((responsejson) => {
				const data = responsejson.data;
            handleChange(data)
			});
			return;
		});
	});
  
  // const submitClose = () => {
  //   submitFunction(bookingData);
  //   onCloseUpdate();
  // };


  return (
    <ChakraProvider theme={theme}>
      <Modal initialFocusRef={initialRef} isOpen={isOpenUpdate} onClose={onCloseUpdate} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold" color="#02033B" fontFamily="Roboto" fontSize="2xl" textAlign="center">
            Update Booking
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} isRequired>
              <FormLabel>ID Room</FormLabel>
              <Input
                ref={initialRef}
                placeholder="ID Room"
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
            <Button colorScheme="purple" mr={3} type="submit" onClick={handleUpdate}>
              Update
            </Button>
            <Button onClick={onCloseUpdate}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default UpdateBooking;
