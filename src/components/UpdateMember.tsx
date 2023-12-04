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
  } from '@chakra-ui/react';

interface UpdateMemberProps {
    disclosure: {
        isOpenUpdate: boolean;
        onCloseUpdate: () => void;
    }
}

const UpdateMember: React.FC<UpdateMemberProps> = ({ disclosure }) => {
    const { isOpenUpdate, onCloseUpdate } = disclosure;
    const initialRef = useRef<HTMLInputElement | null>(null);
    const [memberData, setMemberData] = useState({
        name: '',
        birthday: new Date(),
        domicile: '',
        telp: '',
    });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMemberData({ ...memberData, [e.target.name]: e.target.value });
    };
    const handleDateChange = (date: Date) => {
        setMemberData({ ...memberData, birthday: date });
    };

    const submitClose = () => {
        onCloseUpdate();
    };

    const handleUpdate = async () => {
        fetch("https://smarthubbe-production.up.railway.app/member/" + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(memberData),
            }).then((response) => {
			if (response.status !== 200) {
				console.log("Failed to update");
				return;
			}
			submitClose();
			return;
		})
    }

    const [isError, setIsError] = useState(false);
    useEffect(() => {
		fetch(
			`https://smarthubbe-production.up.railway.app/member/` + id
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

    return (
        <>
        {!isError && (
            <Modal initialFocusRef={initialRef} isOpen={isOpenUpdate} onClose={onCloseUpdate} size="xl">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader
                    fontWeight="bold"
                    color="#02033B"
                    fontFamily="Roboto"
                    fontSize="2xl"
                    textAlign="center"
                >
                    Update Data Member {memberData.name}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl mt={4} isRequired>
                    <FormLabel>Nama</FormLabel>
                    <Input value={memberData.name} name="name" onChange={handleChange} />
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
                    <Input value={memberData.domicile} name="domicile" onChange={handleChange} />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                    <FormLabel>Telp</FormLabel>
                    <Input value={memberData.telp} name="telp" onChange={handleChange} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button bg={"#6878F4"} color={"#FFFFFF"} mr={3} type="submit" onClick={handleUpdate}>
                        Submit
                    </Button>
                    <Button onClick={onCloseUpdate}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        )}
        </>
    );
};

export default UpdateMember;