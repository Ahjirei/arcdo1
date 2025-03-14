import IndustryPartners from "../components/industry_partners/IndustryPartners"
import Navbar from "../components/Navbar"
import HomeNavbar from "../components/HomeNavbar"

export default function IndustryPartnersPage() {
  return (
    <div className="font-montserrat  h-auto">
      <Navbar />
      <IndustryPartners />
      <HomeNavbar />
    </div>
  )
}
