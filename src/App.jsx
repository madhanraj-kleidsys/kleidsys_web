import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TransitionUp from './components/shutters/TransitionUp.jsx'
import ShutterScreen from './components/shutters/ShutterScreen.jsx'
import Transition from './components/transition';
function App() {
  return (
    <>
      <ShutterScreen/>
      {/* <Transition
        intro={
          <div className="text-center text-white dark:text-black">
            <h1 className="text-3xl font-bold">Welcome!</h1>
          </div>
        }
        introDuration={2}
        transitionDuration={1}
        type="curved"
        direction="bottom"
      >
         <div className="text-center text-white dark:text-black">
          <p>This is the main content inside Transition.</p>
        </div>
      </Transition> */}
    </>
  )
}

export default App