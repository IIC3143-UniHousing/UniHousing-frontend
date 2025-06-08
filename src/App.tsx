import LandingPage from './pages/LandingPage/LandingPage';
import { useUser } from './context/UserContext';

function App() {
  const { user } = useUser();
  return <LandingPage user={user} />;
}

export default App;