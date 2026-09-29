import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/theme/ThemeProvider';
import Navbar from '@/components/Navbar'
import AppRoutes from './AppRoutes';
import Footer from '@/components/Footer';
import FrameCorners from '@/components/FrameCorners';
import NavigationController from '@/components/NavigationController';
import ScrollControls from '@/components/ScrollControls';
import { APP_SCROLL_CONTAINER_ID } from '@/lib/scroll';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Navbar />
        <FrameCorners />
        <NavigationController />
        <div id={APP_SCROLL_CONTAINER_ID} style={{ overflowY: 'auto', height: '100vh' }}>
          <AppRoutes />
          <Footer />
        </div>
        <ScrollControls />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
