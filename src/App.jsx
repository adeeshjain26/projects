import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [useNum, setUseNum] = useState(false);
  const [useChar, setUseChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pwd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const characters = "!@#$%^&*_";
    
    if (useNum) str += numbers;
    if (useChar) str += characters;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pwd += str[randomIndex];
    }

    // Ensure at least one number and one special character if required
    if (useNum && !/[0-9]/.test(pwd)) {
      const randomIndex = Math.floor(Math.random() * length);
      pwd = pwd.substring(0, randomIndex) + numbers[Math.floor(Math.random() * numbers.length)] + pwd.substring(randomIndex + 1);
    }

    if (useChar && !/[!@#$%^&*_]/.test(pwd)) {
      const randomIndex = Math.floor(Math.random() * length);
      pwd = pwd.substring(0, randomIndex) + characters[Math.floor(Math.random() * characters.length)] + pwd.substring(randomIndex + 1);
    }

    setPassword(pwd);
  }, [length, useNum, useChar, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, useNum, useChar, passwordGenerator]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
    }).catch((err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-3 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-4"
            placeholder="Password"
            readOnly
          />
          <button
            className="outline-none bg-blue-500 text-center text-white px-3 py-1 shrink-0"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
              type="range" 
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-3">
            <input 
              type="checkbox"
              id="numInput"
              checked={useNum}
              onChange={() => setUseNum((prev) => !prev)}
            />
            <label htmlFor="numInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-3">
            <input 
              type="checkbox"
              id="charInput"
              checked={useChar}
              onChange={() => setUseChar((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
