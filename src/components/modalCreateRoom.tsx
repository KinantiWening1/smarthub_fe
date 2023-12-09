import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'
import { useState } from 'react'


function CreateRoom() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [name,setName]= useState()
    return (
      <>
        <Button color='#6878F4' onClick={onOpen}>Tambah Ruangan</Button >

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Tambah Ruangan Baru</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nama Ruangan</FormLabel>
                <Input placeholder='Nama Ruangan' />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Tipe Ruangan</FormLabel>
                <Input placeholder='Tipe Ruangan' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Ukuran Ruangan</FormLabel>
                <Input placeholder='Tipe Ruangan' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Kapasitas Ruangan</FormLabel>
                <Input placeholder='Kapasitas Ruangan' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Ketersediaan Ruangan</FormLabel>
                <Input placeholder='Tipe Ruangan' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Harga Ruangan</FormLabel>
                <Input placeholder='Harga Ruangan' />
              </FormControl>
            </ModalBody>

  
            <ModalFooter>
              <Button color = '#6878F4' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default CreateRoom;