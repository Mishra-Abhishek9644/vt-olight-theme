import { useState } from 'react'
import RoutesIndex from './routes/index.jsx'
import Nav from './components/Nav.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container-lg mt-5'>
      <ScrollToTop />
      <Nav />
     <RoutesIndex />
    </div>
  )
}

export default App
