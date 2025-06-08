import LandingPage from './pages/LandingPage/LandingPage'
import { getUser } from './utils/auth/user';
import { useState } from 'react'

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <LandingPage user={user}/>
  )
}

export default App