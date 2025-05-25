import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from 'styles/globalStyles'
import Navbar from '@/components/Navbar'
import AppRoutes from './routes/AppRoutes';

function App() {
  console.log('App Rendering...')

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
