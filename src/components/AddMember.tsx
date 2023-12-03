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

interface AddMemberProps {
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
  };
  submitFunction: (memberData: any) => void;
}

const AddMember: React.FC<AddMemberProps> = ({ disclosure, submitFunction }) => {
  const { isOpen, onClose } = disclosure;
  const initialRef = useRef<HTMLInputElement | null>(null);
  const [memberData, setMemberData] = useState({
    name: '',
    birthday: new Date(),
    domicile: '',
    telp: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date) => {
    setMemberData({ ...memberData, birthday: date });
  };

  const submitClose = () => {
    submitFunction(memberData);
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
            Daftar Menjadi Member
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} isRequired>
              <FormLabel>Nama</FormLabel>
              <Input ref={initialRef} placeholder="Nama" name="name" onChange={handleChange} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Ulang Tahun</FormLabel>
              <DatePicker
                selected={memberData.birthday}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                wrapperClassName="datePicker"
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Domisili</FormLabel>
              <Input placeholder="Domisili" name="domicile" onChange={handleChange} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Telp</FormLabel>
              <Input placeholder="Telp" name="telp" onChange={handleChange} />
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

export default AddMember;
