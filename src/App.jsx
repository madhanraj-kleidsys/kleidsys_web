import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TransitionUp from './components/shutters/TransitionUp.jsx'
import { Transition } from './components/ui/transition.jsx'
import ShutterScreen from './components/shutters/ShutterScreen.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <ShutterScreen/>
      {/* <TransitionUp /> */}
    </>
  )
}

export default App