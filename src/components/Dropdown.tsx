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
        height: '200px',
        width: '200px',
        padding: '.5rem',
        textAlign: 'start',
        fontSize: '20px',
        visibility: 'visible',
        color: '#010101',
        borderRadius: '5px',
      }}
      onClick={(e) => {
        e.preventDefault();
        setOpen(!open);
      }}
    >
      clickawefawefwafe
      {/* <div
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
      </div> */}
    </div>
  );
};

export default Dropdown;
