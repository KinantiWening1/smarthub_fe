import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
    Button,
    Stack,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import UpdateMember from "../components/UpdateMember";
import DeleteMember from "../components/DeleteMember";
  
export interface MemberProperty {
    idMember: number;
    name: string;
    birthday: Date;
    domicile: string;
    telp: string;
}

export default function MemberData() {
    const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const [memberId, setMemberId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 20;
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

	const [memberArray, setMemberArray] = useState<MemberProperty[]>([]);
	const [isError, setIsError] = useState(false);
	useEffect(() => {
		fetch(
			`https://smarthubbe-production.up.railway.app/member?page=${currentPage}`
		).then((response) => {
			if (response.status !== 200) {
				setIsError(true);
				return;
			}
			response.json().then((responsejson) => {
				const data = responsejson.data;
				setMemberArray([...new Set(memberArray.concat(data))]);
			});
			return;
		});
	}, [currentPage]);
    
    const currentRows = memberArray.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(memberArray.length / rowsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    const handleOpenUpdate = (id: number) => {
        setMemberId(id); // Set the member ID
        onOpenUpdate();
    };
    const handleOpenDelete = (id: number) => {
        setMemberId(id); // Set the member ID
        onOpenDelete();
    };
    const handleCloseUpdate = () => {
        onCloseUpdate();
        setMemberId(0); // Reset member ID after modal is closed
    };
    const handleCloseDelete = () => {
        onCloseDelete();
        setMemberId(0); // Reset member ID after modal is closed
    };

	return (
		<>
        <Navbar status="admin"/>
        {!isError && (
            <Stack minH={'100vH'} px={32} mb={10}>
                <TableContainer>
                    <Heading color={"#6878F4"} py={10}>Members of Coworking Space</Heading>
                    <Table variant="striped" colorScheme='blue'>
                        <TableCaption>Coworking Space Member Data</TableCaption>
                        <Thead>
                        <Tr>
                            <Th>Member ID</Th>
                            <Th>Nama</Th>
                            <Th>Tanggal Lahir</Th>
                            <Th>Domisili</Th>
                            <Th>Nomor Kontak</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {currentRows.map((row) => (
                            <Tr key={row.idMember}>
                                <Td>{row.idMember}</Td>    
                                <Td>{row.name}</Td>
                                <Td>{new Date(row.birthday).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    })}
                                </Td>
                                <Td>{row.domicile}</Td>
                                <Td>{row.telp}</Td>
                                <Td>
                                    <Button colorScheme="teal" mr={2}
                                    // onClick={() => {
                                    //     setMemberId(row.idMember);
                                    //     onOpenUpdate();
                                    // }}>
                                    onClick={() => handleOpenUpdate(row.idMember)}>
                                        Update
                                    </Button>
                                    
                                    <Button colorScheme="red"
                                    // onClick={() => {
                                    //     setMemberId(row.idMember);
                                    //     onOpenDelete();
                                    // }}>
                                    onClick={() => handleOpenDelete(row.idMember)}>
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Stack align={"center"} direction={"row"} p={5}>
                    <Button bg={"#6878F4"} color={"#FFFFFF"} onClick={prevPage} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Text px={5}>Page {currentPage} of {totalPages}</Text>
                    <Button bg={"#6878F4"} color={"#FFFFFF"} onClick={nextPage} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </Stack>
                <UpdateMember
                    memberId={memberId}
                    disclosure={{ isOpen: isOpenUpdate, onClose: handleCloseUpdate }}
                />
                <DeleteMember
                    memberId={memberId}
                    disclosure={{ isOpen: isOpenDelete, onClose: handleCloseDelete }}
                />
            </Stack>
            
        )}
        <Footer/>
		</>
    );
}