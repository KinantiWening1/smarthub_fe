
import { Heading } from '@chakra-ui/react';
import Navbar from '../components/Navbar'
import ThreeRoomCards from '../components/RoomCards'

export default function RoomPublic() {
    return (
      <>
      <Navbar status="public"/>
      <Heading textAlign={"center"} py={8}>Fasilitas yang Tersedia</Heading>
      <ThreeRoomCards />
      <ThreeRoomCards />
      </>
    );
}
