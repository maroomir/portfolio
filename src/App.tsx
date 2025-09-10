import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from 'styles/globalStyles'
import Navbar from '@/components/Navbar'
import AppRoutes from './routes/AppRoutes';
// import ScrollToTop from '@/components/ScrollToTop'; // ScrollControls가 대체
import Footer from '@/components/Footer';
import NavigationController from '@/components/NavigationController';
import ScrollControls from '@/components/ScrollControls';

function App() {
  console.log('App Rendering...')

  return (
    <BrowserRouter>
      <GlobalStyles />
      {/* <ScrollToTop /> 제거 */}
      <Navbar />
      <NavigationController />
      <div id="app-scroll-container" style={{ overflowY: 'auto', height: '100vh' }}>
        <AppRoutes />
        <Footer />
      </div>
      <ScrollControls />
    </BrowserRouter>
  );
}

export default App;
