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
    disclosure: {
        isOpenDelete: boolean;
        onCloseDelete: () => void;
    }
}

const DeleteMember: React.FC<DeleteMemberProps> = ({ disclosure }) => {
    const { isOpenDelete, onCloseDelete } = disclosure;
    const initialRef = useRef<HTMLInputElement | null>(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const submitClose = () => {
        onCloseDelete();
    };

    const handleDelete = async () => {
        fetch("https://smarthubbe-production.up.railway.app/member/" + id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',},
            }).then((response) => {
			if (response.status !== 200) {
				console.log("Failed to delete");
				return;
			}
			submitClose();
			return;
		})
    }

    return (
        <>
        <Modal initialFocusRef={initialRef} isOpen={isOpenDelete} onClose={onCloseDelete} size="xl">
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
                <Button onClick={onCloseDelete}>Cancel</Button>
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    );
};

export default DeleteMember;