import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { Link as RouterLink } from "react-router-dom";
  
  const IMAGE =
    '/room1.jpg'
  
  const customButtonStyle = {
      backgroundColor: '#6878F4', 
      color: 'white',        
  };
  const RoomCards = () => {
    // useEffect (() => {
    //   fetch('http://localhost:5000/room')
    // }, [])
    return (
      <Box
      role={'group'}
      p={6}
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
      justifyContent={"center"}
    >
      <Box
        rounded={'lg'}
        mt={-12}
        pos={'relative'}
        height={'230px'}
      >
        <Image
          rounded={'lg'}
          height={230}
          width={282}
          objectFit={'cover'}
          src={IMAGE}
          alt="#"
        />
      </Box>
      <Stack pt={10} align={'center'}>
        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
          Meeting Room
        </Text>
        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={800} color={"blue"}>
          Jujutsu
        </Heading>
        <Stack direction={'row'} align={'center'}>
          <Text fontWeight={500} fontSize={'xl'}>
            Rp15.000
          </Text>
        </Stack>
        <Button colorScheme="blue" as={RouterLink} to="/room1data" style={customButtonStyle}>
              Lihat Details
        </Button>
      </Stack>

      
    </Box>
    
  );
  };

const ThreeRoomCards = () => {
  return (
    <Center py={12}>
      <Stack direction="row" spacing={6}>
        <RoomCards />
        <RoomCards />
        <RoomCards />
      </Stack>
    </Center>
  );
};

export default ThreeRoomCards;