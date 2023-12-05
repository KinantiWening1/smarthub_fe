import React, { useRef, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios'

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
    memberId: number;
    disclosure: {
        isOpen: boolean;
        onClose: () => void;
    }
}

const UpdateMember: React.FC<UpdateMemberProps> = ({ memberId, disclosure}) => {
    const [isError, setIsError] = useState(false);
    const { isOpen, onClose } = disclosure;
    const initialRef = useRef<HTMLInputElement | null>(null);
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [domicile, setDomicile] = useState("");
    const [telp, setTelp] = useState("");

    const handleUpdate = async () => {
        // try {
        //     const formattedData = {
        //       ...updatedData,
        //     birthday: updatedData.birthday.toISOString(),
        //    };
        //     const response = await axios.put('https://smarthubbe-production.up.railway.app/member/${memberId}', updatedData);
        //     console.log('Member added successfully:', response.data);
        //     console.log(updatedData)
        //     onClose(); 
        //   } catch (error) {
        //     console.error('Error updating member:', error);
        //   }
        const body = JSON.stringify({name, domicile, telp})

        fetch("https://smarthubbe-production.up.railway.app/member/" + memberId, {
            method: "PUT",
            body,
            headers: {
                "Content-Type": "application/json"
            }
            }).then(async(response) => {
            const responsejson = await response.json();
            if (responsejson.status !== "valid"){
                console.log("Failed to update");
            }
			if (response.status !== 200) {
				console.log("Failed to update");
				return;
			}
            if (responsejson.status === "valid"){
                console.log("Successfully updated", responsejson.data)
            }
            console.log("actual name= " + name)
            console.log("name after update = " + responsejson.data.name)
            onClose;
            window.location.reload();
            return;
		})
    }

    useEffect(() => {
        console.log("init member id = " + memberId)
		fetch(
			"https://smarthubbe-production.up.railway.app/member/" + memberId
		).then(async (response) => {
            const responsejson = await response.json();
			if (responsejson === null) {
				setIsError(true);
                console.log("Failed to fetch")
				return;
			}
            setName(responsejson.name)
            setBirthday(responsejson.birthday)
            setDomicile(responsejson.domicile)
            setTelp(responsejson.telp)
            console.log("id after fetch = " + memberId)
            console.log("birthday = " + birthday)
			return;
		});
	}, [memberId !== 0]);

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
                    Update Data Member
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl mt={4} isRequired>
                    <FormLabel>Nama</FormLabel>
                    <Input placeholder={name} name="name" 
                    onChange={(e) => {setName(e.target.value)}} 
                    />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                    <FormLabel>Ulang Tahun</FormLabel>
                    <Input disabled value={new Date(birthday).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })} />
                    {/* <DatePicker
                        selected={new Date()}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        wrapperClassName="datePicker"
                    /> */}
                    </FormControl>
                    <FormControl mt={4} isRequired>
                    <FormLabel>Domisili</FormLabel>
                    <Input placeholder={domicile} name="domicile" 
                    onChange={(e) => {setDomicile(e.target.value)}} 
                    />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                    <FormLabel>Telp</FormLabel>
                    <Input placeholder={telp} name="telp" 
                    onChange={(e) => {setTelp(e.target.value)}} 
                    />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button bg={"#6878F4"} color={"#FFFFFF"} mr={3} type="submit" onClick={handleUpdate}>
                        Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        )}
        </>
    );
};

export default UpdateMember;