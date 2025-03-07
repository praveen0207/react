import { useState, useCallback, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react';

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [password, setpassword] = useState('')

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed){ str+= "0123456789"}
    if(characterAllowed){ str+= "!@#$%&*()_+^"}

    for(let i=1;i<length;i++){
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setpassword(pass);
  }, [length,numberAllowed,characterAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }

  useEffect(() => {
    generatePassword();
  },[length,numberAllowed,characterAllowed])




  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className=' text-white text-center my-3'> Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3 bg-white'
        placeholder='Password'
        readOnly
        ref={passwordRef}
         />
         <button 
         onClick={copyPasswordToClipboard}className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={14}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setlength(e.target.value)} />
          <label htmlFor="length">Length: {length}</label>
          <input type="checkbox" 
          defaultChecked = {numberAllowed}
          onChange={() => {
            setnumberAllowed((prev) => !prev)
          }} />
          <label htmlFor="number">Number</label>
          <input type="checkbox" 
          defaultChecked = {characterAllowed}
          onChange={() => {
            setcharacterAllowed((prev) => !prev)
          }} />
          <label htmlFor="character">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
