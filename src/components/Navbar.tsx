import {
    Box,
    Flex,
    Spacer,
    Text,
    Link,
    Image,
    Button,
  } from "@chakra-ui/react";
  import { Link as RouterLink } from "react-router-dom";
  import Logo from '../assets/logo_horizontal.svg';
  import Logout from '../components/Logout'

  
  export default function Navbar(props: { status: string; } ){
    const isAdmin =  (props.status == "admin"); 
    const isPublic =  (props.status == "public"); 
    const customButtonStyle = {
      backgroundColor: '#6878F4', 
      color: 'white',        
    };
    return (
        <Box
          bg="#050A30"
          color="#F4F6FC"
          p={4}
          fontSize="lg"
          fontWeight="bold"
          display={{ md: "flex" }}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          maxWidth="100%"
          marginX="auto"
          position="relative"
        > 
          {isAdmin &&
            <Link as={RouterLink} to="/admin">
              <Image
                src={Logo}
                alt="Logo"
                boxSize={40}
                h={12}
                objectFit="contain"
              />
            </Link>
          }

          {isPublic &&
            <Link as={RouterLink} to="/">
              <Image
                src={Logo}
                alt="Logo"
                boxSize={40}
                h={12}
                objectFit="contain"
              />
            </Link>
          }
  
          {/* Links */}
          <Flex display={{ base: "none", md: "flex" }}>
          {
              isPublic && 
            <Box
              mx={10}
              position="relative"
              fontWeight="bold"
              padding= '10px'
              style={{ whiteSpace: 'nowrap' }}
              _hover={{
                color: 'blue',
                bgColor: '#F4F6FC',
                rounded: 'md',
              }}
            >
              <Link
                fontSize="md"
                fontWeight="bold" 
                _hover={{
                  color: 'white',
                }}
                as={RouterLink} to="/"
              >
                Beranda
              </Link>
            </Box>
            }
  
            {
              (isAdmin || isPublic) &&
            <Box
              mx={10}
              position="relative"
              fontWeight="bold"
              rounded= 'md'
              padding='10px'
              style={{ whiteSpace: 'nowrap' }}
              _hover={{
                color: 'blue',
                bgColor: '#F4F6FC',
              }}
            >
              <Link
                fontSize="md"
                fontWeight="bold" 
                _hover={{
                  textColor: 'blue',
                }}
                as={RouterLink}
                to={isAdmin ? "/roomdata" : "/roompublic"}
              >
                Data Fasilitas
              </Link>
              
            </Box>
            }
  
            {
              isAdmin &&
              <Box
                mx={10}
                position="relative"
                fontWeight="bold"
                rounded='md'
                padding='10px'
                style={{ whiteSpace: 'nowrap' }}
                _hover={{
                  color: 'blue',
                  bgColor: '#F4F6FC',
                }}
              >
                <Link
                  fontSize="md"
                  fontWeight="bold"
                  _hover={{
                    color: 'blue',
                  }}
                  as={RouterLink} to="/memberdata"
                >
                  Data Member
                </Link>
              </Box>
            }
  
            {
              isAdmin &&
              <Box
                mx={10}
                position="relative"
                fontWeight="bold"
                rounded='md'
                padding='10px'
                style={{ whiteSpace: 'nowrap' }}
                _hover={{
                  color: 'blue',
                  bgColor: '#F4F6FC',
                }}
              >
                <Link
                  fontSize="md"
                  fontWeight="bold"
                  _hover={{
                    color: 'blue',
                  }}
                  as={RouterLink} to="/bookingdata"
                >
                  Data Reservasi
                </Link>
              </Box>
            }
          </Flex>
  
          <Spacer mx={5} />
            
          {/* Admin Greeting */}
  
          { isAdmin &&
          <Flex alignItems="center">
            <Text mr={4} fontWeight="bold" fontSize="md" style={{ whiteSpace: 'nowrap' }}>
              Hi, Admin
              </Text>
            <Spacer mx={2} />
          </Flex>
          }

          { isAdmin && <Logout/>}
      
          { isPublic && 
            <Button colorScheme="blue" mr={3} as={RouterLink} to="/login" style={customButtonStyle}>
              Login
            </Button>
          }
        </Box>
    );
  };