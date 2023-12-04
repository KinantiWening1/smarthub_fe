import React from 'react';
import {Button} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const customButtonStyle = {
    backgroundColor: '#6878F4', 
    color: 'white',        
  };

const Logout: React.FC = () => {
    return(
        <Button 
            colorScheme="blue" 
            mr={3} 
            as={RouterLink} to="/"
            style={customButtonStyle}
            > Log out
        </Button>
    )
}

export default Logout;