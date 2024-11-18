import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Features from '../../containers/Features';

const Home = () => {
     return (
       <>
         <Header />
         <main>
          <Hero />
          <Features />
         </main>
         <Footer />
       </>
     );
   }
   
   export default Home;