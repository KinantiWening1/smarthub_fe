import React, { useRef, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Image
  } from '@chakra-ui/react'

const Login: React.FC = () => {
    const initialRef = useRef<HTMLInputElement | null>(null);
    const adminAccount = {
        username: "admin123",
        password: "adminpass123"
    }
    const [account, setAccount] = useState({
        username: '',
        password: '',
    });

    function handleLogin(account: any): string {
        if (account.username === adminAccount.username) {
            if (account.password === adminAccount.password) {
            return "/admin"
            }
        };
        return "/login"
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    return (
      <Stack minH={'full'} direction={{ base: 'column', md: 'row' }} bg={"#FFFFFF"}>
        <Flex align={'center'} justify={'center'}>
            <Stack justify={'flex-start'} px={28}>
                <Stack align={'center'} mb={10}>
                    <Heading fontSize={'4xl'} color={"#6878F4"}>Log in as Admin</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={"#C2C9FA"}
                    boxShadow={'lg'}
                    p={16}>
                    <Stack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input ref={initialRef} placeholder="Username" name="username" onChange={handleChange} bg={'white'}/>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input ref={initialRef} placeholder="Password" name="password" onChange={handleChange} bg={'white'}/>
                        </FormControl>
                        <Button
                            as={RouterLink} to={handleLogin(account)}
                            bg={'blue.400'}
                            color={'white'}
                            my={5}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Sign in
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
        <Flex flex={1}>
            <Image
                alt={'Login Image'}
                objectFit={'contain'}
                src={
                '../loginadmin.jpg'
                }
            />
        </Flex>
      </Stack>
    )
}

export default Login;