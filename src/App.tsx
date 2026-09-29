import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from '@/styles/globalStyles'
import Navbar from '@/components/Navbar'
import AppRoutes from './routes/AppRoutes';
// import ScrollToTop from '@/components/ScrollToTop'; // ScrollControls가 대체
import Footer from '@/components/Footer';
import FrameCorners from '@/components/FrameCorners';
import NavigationController from '@/components/NavigationController';
import ScrollControls from '@/components/ScrollControls';
import { APP_SCROLL_CONTAINER_ID } from '@/lib/scroll';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      {/* <ScrollToTop /> 제거 */}
      <Navbar />
      <FrameCorners />
      <NavigationController />
      <div id={APP_SCROLL_CONTAINER_ID} style={{ overflowY: 'auto', height: '100vh' }}>
        <AppRoutes />
        <Footer />
      </div>
      <ScrollControls />
    </BrowserRouter>
  );
}

export default App;
