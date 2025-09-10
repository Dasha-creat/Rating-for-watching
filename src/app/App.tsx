import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import { AppRouter } from './providers';
import { Header, Footer} from '../widgets/index'

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}
