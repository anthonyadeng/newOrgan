import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from './components/Dropdown';
import Checkbox from './components/Checkbox';
import Todo from './components/Todo';

function App() {
  const [images, setImages] = useState<string[]>([]);

  const handleDropdown = useCallback((selected: string) => {
    console.log('selected: ', selected);
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Todo List</h1>
        <Todo todos={[]} completed={[]} />
        <h1>Checkbox</h1>
        <Checkbox
          labels={[
            'One',
            'Two',
            'Three',
            'red',
            'blue',
            'green',
            'dog',
            'cat',
            'fish',
          ]}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
