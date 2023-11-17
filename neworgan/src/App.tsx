import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from './components/Dropdown';
import Checkbox from './components/Checkbox';

function App() {
  const [images, setImages] = useState<string[]>([]);

  const handleDropdown = useCallback((selected: string) => {
    console.log('selected: ', selected);
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        {/* <Dropdown callback={handleDropdown} /> */}
        {/* {images.map((image, index) => (
          <img key={index} src={image} className='App-logo' alt='logo' />
        ))} */}
        <Checkbox labels={['One', 'Two', 'Three']} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
