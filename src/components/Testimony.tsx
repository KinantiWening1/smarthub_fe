'use client'

import { Avatar, Box, Stack, Text, useColorModeValue } from '@chakra-ui/react'

export default function Testimony() {
  return (
    <Stack
      bg={useColorModeValue('gray.50', 'gray.800')}
      py={16}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={'center'}
      direction={'column'}>
      <Text fontSize={{ base: 'xl', md: '2xl' }} textAlign={'center'} maxW={'3xl'}>
        We had an incredible experience working in SmartHub Coworking Space and were impressed
        they made such a big difference in our productivity. Our team is so grateful for
        the wonderful environment they have set!
      </Text>
      <Box textAlign={'center'}>
        <Avatar
          src={
            'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
          }
          mb={2}
        />

        <Text fontWeight={600}>Nobara Kugisaki</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.400', 'gray.400')}>
          SmartHub Member
        </Text>
      </Box>
    </Stack>
  )
}