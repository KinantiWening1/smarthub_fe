import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Testimony from '../components/Testimony'
import WhatYouGet from '../components/WhatYouGet'
import Footer from '../components/Footer'

export default function LandingPage() {
    return (
      <>
      <Navbar status="public"/>
      <Header/>
      <Testimony/>
      <WhatYouGet/>
      <Footer/>
      </>
    );
}