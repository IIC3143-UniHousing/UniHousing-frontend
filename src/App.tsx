import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [hello, setHello] = useState<string>('')
  const [dbHealth, setDbHealth] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/hello`)
      .then(response => {
        setHello(response.data.data)
      })
      .catch(() => {
        setHello('Error al llamar al backend')
      })
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/dbhealth`)
      .then(() => {
        setDbHealth(true)
      })
      .catch(() => {
        setDbHealth(false)
      })
  }, []);

  return (
    <>
      <h1>{hello}</h1>
      <h2 className="font-bold">Database is { dbHealth ? "" : "NOT" } working</h2>
    </>
  )
}

export default App
