import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from 'styles/globalStyles'
import Navbar from '@/components/Navbar'
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from '@/components/ScrollToTop';
import Footer from '@/components/Footer';
import NavigationController from '@/components/NavigationController';
import ScrollControls from '@/components/ScrollControls';

function App() {
  console.log('App Rendering...')

  return (
    <BrowserRouter>
      <GlobalStyles />
      <ScrollToTop />
      <Navbar />
      <NavigationController />
      <AppRoutes />
      <ScrollControls />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
