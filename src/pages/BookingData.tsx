import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  useDisclosure
  
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import AddBookingAdmin from "../components/AddBookingAdmin";
import UpdateBooking from "../components/UpdateBooking";
import axios from "axios";

interface Room {
  "idBooking": number,
  "idRoom": number,
  "bookerName": string,
  "bookingMade": Date,
  "reservedTime": Date
}
const Index = () => {
  const [rows, setRows] = useState<Room[]>([]);
  const [deleteToggle, setDeleteToggle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setLastPage] = useState(false);
  const toast = useToast(); // Using Chakra UI toast

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();



  const handleBookingSubmit = async (bookingData: any) => {
	try {
	  const formattedData = {
		...bookingData,
		reservedTime: bookingData.reservedTime.toISOString(),
	  };
  
	  const response = await axios.post('https://smarthubbe-production.up.railway.app/booking/', formattedData);
	  console.log('Reservation added successfully:', response.data);
	  console.log(formattedData);
	  onClose();
	} catch (error: any) { // Explicitly define 'error' as 'Error' type
		console.error('Error adding reservation:', error);
		toast({
		  title: 'Error adding reservation',
		  description: error.message, // Access 'message' property of 'Error' type 'error'
		  status: 'error',
		});
	}
  };

  const handleUpdateSubmit = async (bookingData: any) => {
    try {
      const formattedData = {
        ...bookingData,
        reservedTime: bookingData.reservedTime.toISOString(),
      };
  
      const response = await axios.put(`https://smarthubbe-production.up.railway.app/booking/${bookingData.id}`, formattedData);
      console.log('Reservation updated successfully:', response.data);
      console.log(formattedData);
      onClose();
    } catch (error: any) {
      console.error('Error updating reservation:', error);
      toast({
        title: 'Error updating reservation',
        description: error.message,
        status: 'error',
      });
    }
  };
  

//   const handleUpdateSubmit = async (bookingData: any) => {
// 	try {
// 	  const formattedData = {
// 		...bookingData,
// 		reservedTime: bookingData.reservedTime.toISOString(),
// 	  };
  
// 	  const response = await axios.put('http://localhost:5001/booking/', formattedData);
// 	  console.log('Reservation updated successfully:', response.data);
// 	  console.log(formattedData);
// 	  onClose();
// 	} catch (error: any) { // Explicitly define 'error' as 'Error' type
// 		console.error('Error updating reservation:', error);
// 		toast({
// 		  title: 'Error updating reservation',
// 		  description: error.message, // Access 'message' property of 'Error' type 'error'
// 		  status: 'error',
// 		});
// 	}
//   };
  
  const getNextPage = async (page : any) => {
    // const token = window.localStorage.getItem("token");
    // if (!token) {
    //   window.location.replace("/auth/login");
    //   return;
    // }
    try {
      const getItems = await fetch(`https://smarthubbe-production.up.railway.app/booking/`, {
        method: "GET",
        headers: {
        //   Authorization: token,
        },
      });
      if (!getItems.ok) {
        toast({
          title: "Unable to get more items!",
          status: "error",
        });
        return;
      }
      const responsejson = await getItems.json();
      setLastPage(responsejson.data.length < 10);
      setRows(responsejson.data);
    } catch (error) {
      toast({
        title: "Something went wrong..",
        status: "error",
      });
    }
  };

  const handleDelete = async (idBooking:any) => {
    // const token = window.localStorage.getItem("token");
    // if (!token) {
    //   window.location.replace("/login");
    //   return;
    // }
    try {
      const deleteRequest = await fetch(`https://smarthubbe-production.up.railway.app/booking/${idBooking}`, {
        method: "DELETE",
        headers: {
        //   Authorization: token,
        },
      });
      setDeleteToggle(null);
      if (!deleteRequest.ok) {
        toast({
          title: "Failed to delete..",
          status: "error",
        });
        return;
      }
      toast({
        title: "Successfully deleted!",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Something went wrong...",
        status: "error",
      });
    }
  };
  



//   const handleUpdate = async () => {
//     const token = window.localStorage.getItem("token");
//     if (!token) {
//       window.location.replace("/login");
//       return;
//     }
//     try {
//       const updateRequest = await fetch(`http://localhost:5001/booking`, {
//         method: "UPDATE",
//         headers: {
//           Authorization: token,
//         },
//       });
//       setDeleteToggle(null);
//       if (!updateRequest.ok) {
//         toast({
//           title: "Failed to delete..",
//           status: "error",
//         });
//         return;
//       }
//       toast({
//         title: "Successfully deleted!",
//         status: "success",
//       });
//     } catch (error) {
//       toast({
//         title: "Something went wrong...",
//         status: "error",
//       });
//     }
//   };

  useEffect(() => {
    // const token = window.localStorage.getItem("token");
    // if (!token) {
    //   window.location.replace("/auth/login");
    //   return;
    // }
    fetch('https://smarthubbe-production.up.railway.app/booking/', {
      method: "GET",
      // headers: {
      //   Authorization: token,
      // },
    })
      .then(async (response) => {
        if (response.status !== 200) {
          toast({
            title: "Failed to retrieve items",
            status: "error",
          });
          return;
        }
        const responsejson = await response.json();
        setRows(responsejson.data);
      })
      .catch(() => {
        toast({
          title: "Something went wrong...",
          status: "error",
        });
      });
  }, []);

  return (
    <>
      <Navbar status="admin"/>
      <Box minH="100vh" px="14" py="5" bgColor="#F4F6FC">
        <Box mb="2">
          {/* <Text
            className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard/owner");
            }}
          >
            Back
          </Text> */}
        </Box>
        <Flex alignItems="center" justifyContent="space-between" mb="4">
          <Heading className="text-[#FFFFFF] font-extrabold text-5xl mb-8">
            Data Booking
          </Heading>
          <Button
            bgColor="#6878F4"
            p="4"
            fontSize="lg"
            fontWeight="bold"
            color="white"
			      onClick={ onOpen }
          >
            Create
          </Button>

        </Flex>
		<AddBookingAdmin disclosure={{ isOpen, onClose }} submitFunction={handleBookingSubmit} />
        <Table w="full" textAlign="center"  >
          <Thead>
            <Tr>
              <Th bgColor="#6878F4"  p="2" borderWidth="1px" style={{ color: '#FFFFFF' }}>
                Booking ID
              </Th>
              <Th bgColor="#6878F4" p="2" borderWidth="1px" style={{ color: '#FFFFFF' }}>
                ID Room
              </Th>
              <Th bgColor="#6878F4" p="2" borderWidth="1px" style={{ color: '#FFFFFF' }}>
                Booker Name
              </Th>
              <Th bgColor="#6878F4" p="2" borderWidth="1px" style={{ color: '#FFFFFF' }}>
                Booking Made
              </Th>
              <Th bgColor="#6878F4" p="2" borderWidth="1px" style={{ color: '#FFFFFF' }}>
                Reserved Time
              </Th>
              <Th bgColor="#6878F4" p="2" borderWidth="1px" style={{ color: '#FFFFFF' }}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows
                .map((row) => (
                <Tr key={row.idBooking} style={{ borderBottom: '1px solid #6878F4', padding: '10px', marginBottom: '10px'} }>
                  <Td p="6" borderWidth="1px" bgColor="#white" style={{ borderColor: '#6878F4' }} >
                    {row.idBooking}
                  </Td>
                  <Td p="6" borderWidth="1px" bgColor="white" style={{ borderColor: '#6878F4' }}>
                    {row.idRoom}
                  </Td>
                  <Td p="6" borderWidth="1px" bgColor="white" style={{ borderColor: '#6878F4' }}>
                    {row.bookerName}
                  </Td>
                  <Td p="6" borderWidth="1px" bgColor="white" style={{ borderColor: '#6878F4' }}>
                    {row.bookingMade.toLocaleString("en-US")}
                  </Td>
                  <Td p="6" borderWidth="1px" bgColor="white" style={{ borderColor: '#6878F4' }}>
                    {row.reservedTime.toLocaleString("en-US")}
                  </Td>
                  <Td px="2" gap={4} display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" borderWidth="1px" bgColor="white" style={{ borderColor: '#6878F4' }}>
                    <Button
                      	w={"full"}
                      	bgColor="#6878F4"
                      	p="1"
                    	  borderRadius="lg"
					  	          color = "white"
						            onClick={onOpen}
                    >
                      Update
                    </Button>
					          {/* <UpdateBooking disclosure={{ isOpenUpdate, onCloseUpdate } } /> */}
                    <UpdateBooking disclosure={{ isOpenUpdate, onCloseUpdate }} />
                    <Button
                        w={"full"}
                        bgColor="#6878F4"
                        color="white"
                        p="1"
                        borderRadius="lg"
                        onClick={() => handleDelete(row.idBooking)
                      }
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>

        <Flex alignItems="center" justifyContent="space-around">
          <Button
		    bgColor="#050A30"
			p="5"
			color="white"
            fontWeight="bold"
            disabled={currentPage === 1}
            onClick={() => {
              getNextPage(currentPage - 1);
              setCurrentPage((page) => page - 1);
            }}
          >
            Prev
          </Button>
          <Text className="h-min my-auto font-bold">Page {currentPage}</Text>
          <Button
            bgColor="#050A30"
            p="5"
            color="white"
            fontWeight="bold"
            disabled={isLastPage}
            onClick={() => {
              getNextPage(currentPage + 1);
              setCurrentPage((page) => page + 1);
            }}
          >
            Next
          </Button>
        </Flex>
      </Box>
      {deleteToggle !== null && (
        <Box
          left="0"
          top="0"
          pos="fixed"
          w="100vw"
          h="100vh"
          bgColor="rgba(255, 255, 255, 0.8)"
          p="20"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        </Box>
      )}
    </>
  );
};

export default Index;
