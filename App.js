import React, { useState } from 'react';

function App() {
  const [state, setState] = useState('');
  const [length, setLength] = useState('');
  const [includeCaps, setIncludeCaps] = useState(false);
  const [includeSmall, setIncludeSmall] = useState(false);
  const [includeSpecial, setIncludeSpecial] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  
  const generatePassword = () => {

    if (!length) {
      setPopupMessage('Please select the length of the password.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
      return;
    }
    let pass = '';
    let string = '0123456789';
    if (includeCaps) string += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeSmall) string += 'abcdefghijklmnopqrstuvwxyz';
    if (includeSpecial) string += '@$&*';

    
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);
    }
    setState(pass);
    console.log (pass);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(state).then(() => {
      setPopupMessage('Password copied successfully!');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
    });
  };

  return (
    <div className="container">
      <h1>Random Password Generator</h1>
      <label>Enter the length of the password</label>
        <input 
          type="number" id="s" value={length} 
          onChange={(e) => setLength(e.target.value)} />
        <label></label>
      <div className="boxes"> 
        <lable>do you want to add:</lable><br></br>
          <input type="checkbox" checked={includeCaps}
            onChange={(e) => setIncludeCaps(e.target.checked)} />Capital letters
       
          <input type="checkbox" checked={includeSmall}
            onChange={(e) => setIncludeSmall(e.target.checked)} />Small letters
       
          <input type="checkbox" checked={includeSpecial}
            onChange={(e) => setIncludeSpecial(e.target.checked)} />Special characters
      </div>
      <input type="text" readOnly disabled placeholder="Password" value={state} />
      <div className="btns">
        <button onClick={generatePassword}>Generate</button>
        <button onClick={copyPassword}>Copy</button>
      </div>
      {showPopup && <div className="popup">{popupMessage}</div>}
    </div>
  );
}

export default App;