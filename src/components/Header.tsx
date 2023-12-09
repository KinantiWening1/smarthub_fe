'use client'

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react'
import AddMember from './AddMember'
import axios from 'axios'

export default function Header() {
  //Modal states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleMemberSubmit = async (memberData:any) => {
    try {
      // Convert Date to ISO string
      const formattedData = {
        ...memberData,
      birthday: memberData.birthday.toISOString(),
     };
      const response = await axios.post('http://localhost:5000/member/', formattedData);
      console.log('Member added successfully:', response.data);
      console.log(formattedData)
      onClose(); 
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: '#6878F4',
                zIndex: -1,
              }}>
              The Best
            </Text>
            <br />{' '}
            <Text color={'#6878F4'} as={'span'}>
              Coworking Space
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            SmartHub is the best coworking space for all of your coworking
            needs. Based in Bandung, Indonesia's most comfortable city.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              onClick={onOpen}
              rounded={'full'}
              bg={'#6878F4'}
              color={'white'}
              _hover={{
                bg: '#6878F4',
              }}>
              Enroll as Member
            </Button>
            <Button rounded={'full'}>See Facilities</Button>
          </Stack>
        </Stack>
        {/* Modal Component */}
        <AddMember disclosure={{ isOpen, onClose }} submitFunction={handleMemberSubmit} />
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}