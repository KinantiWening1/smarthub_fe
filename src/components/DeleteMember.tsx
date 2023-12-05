import React, { useRef } from 'react';
import { useLocation } from "react-router-dom";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
  } from '@chakra-ui/react';

interface DeleteMemberProps {
    memberId: number | null;
    disclosure: {
        isOpen: boolean;
        onClose: () => void;
    }
}

const DeleteMember: React.FC<DeleteMemberProps> = ({ memberId, disclosure }) => {
    const { isOpen, onClose } = disclosure;
    const initialRef = useRef<HTMLInputElement | null>(null);

    const handleDelete = async () => {
        fetch("https://smarthubbe-production.up.railway.app/member/" + memberId, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',},
            }).then((response) => {
			if (response.status !== 200) {
				console.log("Failed to delete");
				return;
			}
			onClose()
            window.location.reload();
			return;
		})
    }

    return (
        <>
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
                Hapus Data Member?
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Button bg={"#6878F4"} color={"#FFFFFF"} mr={3} type="submit" onClick={handleDelete}>
                    Delete
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    );
};

export default DeleteMember;