import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Books from "../components/Books/Books";
import Navbar from "../components/Navbar/Navbar";

function Home (){
    return(
        <>
       <Navbar/>
        <Hero/>
        <Books/>
       <Footer/>
        </>
    )
}

export default Home;