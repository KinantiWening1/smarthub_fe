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
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Roboto Bold, sans-serif',
  },
});

interface AddPaymentProps {
  isOpen: boolean;
  onClose: () => void;
  submitPaymentFunction: (paymentData: any) => void;
  bookingData: any;
}
// interface AddPaymentProps {
//   disclosure: {
//     isOpen: boolean;
//     onClose: () => void;
//   };
//   submitPaymentFunction: (paymentData: any) => void;
//   bookingData: any;
// }

const AddPayment: React.FC<AddPaymentProps> = ({ isOpen, onClose, submitPaymentFunction, bookingData }) => {
  const initialRef = useRef<HTMLInputElement | null>(null);
  const [paymentData, setPaymentData] = useState({
    paymentId: '',
    norek: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const submitPayment = () => {
    // Combine bookingData with paymentData for submission
    const dataToSubmit = { ...bookingData};
    submitPaymentFunction(dataToSubmit);
    onClose();
  };

  return (
    <ChakraProvider theme={theme}>
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
            Payment
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} isRequired>
              <FormLabel>Payment ID</FormLabel>
              <Input placeholder="Payment ID" name="paymentId" onChange={handleChange} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>No Rekening</FormLabel>
              <Input placeholder="Norek" name="norek" onChange={handleChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={submitPayment}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default AddPayment;
