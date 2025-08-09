import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from 'styles/globalStyles'
import Navbar from '@/components/Navbar'
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from '@/components/ScrollToTop';
import Footer from '@/components/Footer';

function App() {
  console.log('App Rendering...')

  return (
    <BrowserRouter>
      <GlobalStyles />
      <ScrollToTop />
      <Navbar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
