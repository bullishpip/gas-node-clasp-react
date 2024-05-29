import React, { useState } from 'react';

function CopyToClipBoardButton({ handleClick, hidden }) {
    return (
      <button onClick={handleClick} hidden={hidden}>
        Copy To Clipboard
      </button>
    );
  }

function App() {
    const [formData, setFormData] = useState('');
    const [divContent, setDivContent] = useState('');

    const handleChange = (event) => {
      setFormData(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      handleUpdateDiv();
      setIsHidden(false);
    };

    const handleUpdateDiv = () => {
        setDivContent(formData);
    };

    const [isHidden, setIsHidden] = useState(true);

    const handleClick = () => {
        alert('Copy To Clipboard Button Clicked!'); // Replace with your desired function
      };
    
    const styles = {
        width: "100%"
    }
  
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="message">Enter HTML To Be Rendered</label>
            <br />
            <textarea id="message" value={formData} onChange={handleChange} rows={10} style={styles}/>
            <br />
            <button type="submit">Submit</button>
        </form>
        <hr />
        <CopyToClipBoardButton handleClick={handleClick} hidden={isHidden} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: divContent }} />
        <br />
        <CopyToClipBoardButton handleClick={handleClick} hidden={isHidden} />
      </div>
    );
}

export default App;

