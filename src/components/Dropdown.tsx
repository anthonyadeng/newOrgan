import { useState, useRef, useEffect, useCallback } from 'react';

type DropdownProps = {
  items?: string[] | string;
  initialValue?: string;
  debug?: boolean;
  callback?: (selected: string) => void;
};

const debugItems = ['One', 'Two', 'Three'];

const Dropdown = ({
  items = [],
  debug = true,
  initialValue = 'My DropdownDropdownDropdownDropdown',
  callback,
}: DropdownProps) => {
  const fields = useRef({
    items: [] as JSX.Element[],
    selected: initialValue,
  });

  const [open, setOpen] = useState(false);

  const cssValues = {
    width: '200px',
    height: '100px',
    border: '1px solid black',
    borderRadius: '10px',
    highlightColor: 'lightblue',
    backgroundColor: 'gray',
    padding: '5px',
  };

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const eventTarget = e.target as HTMLElement;
    fields.current.selected = eventTarget.innerText;
    if (callback) {
      callback(fields.current.selected);
    }
  };

  useEffect(() => {
    if (debug) {
      fields.current.items = debugItems.map((item) => (
        <div
          onClick={(e) => handleClick(e)}
          style={{
            display: 'flex',
            width: cssValues.width,
            padding: cssValues.padding,
            justifyContent: 'left',
            border: cssValues.border,
            backgroundColor:
              fields.current.selected === item
                ? cssValues.highlightColor
                : cssValues.backgroundColor,
          }}
          key={item}
        >
          {item}
        </div>
      ));
    }
  });

  return (
    <div
      id='dropdownComponentWrapper'
      style={{
        border: '1px solid black',
        backgroundColor: 'white',
        height: '1rem',
        width: '10rem',
        padding: '.5rem',
        textAlign: 'start',
        fontSize: '20px',
        color: '#010101',
        borderRadius: '5px',
      }}
      onClick={(e) => {
        e.preventDefault();
        setOpen(!open);
      }}
    >
      <div
        id='fieldsCurrentWrapper'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          id='fieldsCurrentSelected'
          style={{
            width: '80%',
            height: '100%',
          }}
        >
          {fields.current.selected}
        </div>
        <div
          id='fieldsCurrentArrow'
          style={{
            width: '20%',
            height: '100%',
          }}
        >
          {open ? '▲' : '▼'}
        </div>
        {fields.current.selected}
        <div
          id='fieldsWrapper'
          style={{
            visibility: open ? 'visible' : 'hidden',
            height: '0px',
            width: '200px',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {fields.current.items}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
