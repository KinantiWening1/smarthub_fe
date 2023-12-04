import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Testimony from '../components/Testimony'
import WhatYouGet from '../components/WhatYouGet'
import Footer from '../components/Footer'

export default function AdminPage() {
    return (
      <>
      <Navbar status="admin"/>
      <Header/>
      <Testimony/>
      <WhatYouGet/>
      <Footer/>
      </>
    );
}