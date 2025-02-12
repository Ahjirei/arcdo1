import React from 'react'
import Moas from "../components/moa/Moas"
import Navbar from "../components/Navbar"
import HomeNavbar from "../components/HomeNavbar"

export default function MoasPage() {
  return (
    <div className="font-montserrat h-auto">
      
      <Navbar />
      <Moas />
      <HomeNavbar />
    </div>
  )
}
