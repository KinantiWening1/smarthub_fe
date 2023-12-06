import React, { useRef, useState, useEffect } from 'react';

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
    Input
  } from '@chakra-ui/react';

interface UpdateBookingProps {
    idBooking: number;
    disclosure: {
        isOpen: boolean;
        onClose: () => void;
    }
}

  
  const UpdateBooking: React.FC<UpdateBookingProps> = ({ idBooking, disclosure }) => {


    const [isError, setIsError] = useState(false);
    const { isOpen, onClose } = disclosure;
    const initialRef = useRef<HTMLInputElement | null>(null);
    const [idRoom, setIdRoom] = useState("");
    const [bookerName, setBookerName] = useState("");
    const [reservedTime, setReservedTime] = useState(new Date());


    const handleUpdate = async () => {
        const body = JSON.stringify({ idRoom, bookerName, reservedTime });
        
        try {
            console.log(body)
            const response = await fetch(`https://smarthubbe-production.up.railway.app/booking/${idBooking}`, {
            // const response = await fetch(`http://localhost:5001/booking/${idBooking}`, {
                method: "PUT",
                body,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(response.status)

            const responsejson = await response.json();
    
            if (response.status !== 200 || responsejson.status !== "valid") {
                console.log("Failed to update");
                return;
            }
    
            console.log("Successfully updated", responsejson.data);
    
            // Check if responsejson.data exists before accessing its properties
            if (responsejson.data && responsejson.data.bookerName) {
                console.log("bookername after update =", responsejson.data.bookerName);
            }
    
            onClose();
    
            window.location.reload();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };



    useEffect(() => {
        if (idBooking) {
            fetch(`https://smarthubbe-production.up.railway.app/booking/` + idBooking)
                .then(async (response) => {
                    const responsejson = await response.json();
                    if (responsejson) {
                        setIdRoom(responsejson.idRoom);
                        setBookerName(responsejson.bookerName);
                        setReservedTime(new Date(responsejson.reservedTime));
                    } else {
                        setIsError(true);
                    }
                })
                .catch((error) => {
                    setIsError(true);
                    console.error('Error fetching data:', error);
                });
        }
    }, [idBooking !== 0]);
    

    return (
        <>
        {!isError && (
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader
                    fontWeight="bold"
                    color="#02033B"
                    fontFamily="Roboto"
                    fontSize="2xl"
                    textAlign="center"
                >
                    Update Data Booking
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl mt={4} isRequired>
                    <FormLabel>ID ROOM</FormLabel>
                    <Input placeholder={idRoom} name="id Room" 
                    onChange={(e) => {setIdRoom(e.target.value)}} 
                    />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                    <FormLabel>Booker Name</FormLabel>
                    <Input placeholder={bookerName} name="booker name" 
                    onChange={(e) => {setBookerName(e.target.value)}} 
                    />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                    <FormLabel>Reserved Time</FormLabel>
                    <Input placeholder={new Date(reservedTime).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                        <Button bg="#6878F4" color="#FFFFFF" mr={3} type="submit" onClick={handleUpdate}>
                            Update
                        </Button>

                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        )}
        </>
    );
};

export default UpdateBooking;