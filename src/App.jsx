import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import check from "./assets/approve_9463151.png";
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState(false);
  const passwordRef = useRef(null);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABDCEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (symbolsAllowed) str += "!@#$%^&*()_+-";
    for (let i = 1; i <= length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(pass);
    setCopy(false);
  }, [numberAllowed, length, symbolsAllowed]);
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);
  const copyPassword = () => {
    // To Copy Password In Clipboard  :)
    window.navigator.clipboard.writeText(password);
    setCopy(true);
    // To Select Password
    passwordRef.current.select();
  };
  return (
    <div className="p-4 w-full md:w-1/2 mx-auto mt-20">
      <h1 className="text-white text-center mb-4">Password Generator</h1>
      <div className="mb-4 flex  rounded-md overflow-hidden">
        <input
          type="text"
          value={password}
          className="w-full px-2 py-1 focus:outline-none"
          readOnly
          placeholder="Password..."
          name=""
          ref={passwordRef}
        />
        <button
          onClick={copyPassword}
          className="py-2 px-4 text-white bg-blue-600"
        >
          {copy ? (
            <img src={check} width={30} alt="check" />
          ) : (
            <span>Copy</span>
          )}
        </button>
      </div>
      <div className="flex items-center justify-between text-white flex-wrap gap-4">
        <div className="flex items-center">
          <input
            type="range"
            name=""
            min={6}
            max={30}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <p className="inline-block ml-2 text-sm mb-1 text-">
            Length: {length}
          </p>
        </div>
        <div className="flex items-center ">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            name=""
            id="nums"
          />
          <label htmlFor="nums" className=" text-sm ml-2  cursor-pointer">
            Numbers
          </label>
        </div>
        <div className="flex items-center ">
          <input
            type="checkbox"
            defaultChecked={symbolsAllowed}
            onChange={() => setSymbolsAllowed((prev) => !prev)}
            name=""
            id="sybmols"
          />
          <label htmlFor="sybmols" className=" text-sm ml-2  cursor-pointer">
            Symbols
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
