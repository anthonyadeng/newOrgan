import { useEffect, useRef, useState } from 'react';
import useDebounce from '../util/useDebounce';
import { css } from '@emotion/react';
type CheckboxContainerProps = {
  labels: string[];
  //   onChange?: (e: React.SyntheticEvent) => void;
};

type CheckboxSingleProps = {
  cssValues?: {
    width?: string;
    height?: string;
    border?: string;
    borderRadius?: string;
    highlightColor?: string;
    backgroundColor?: string;
    padding?: string;
  };
  label: string;
  checked: boolean;
  handleClick: (label: string) => void;
};

const CheckboxContainer = (props: CheckboxContainerProps) => {
  const { labels, ...rest } = props;
  const [selected, setSelected] = useState<{ [key: string]: boolean }>(
    labels.reduce((acc, label) => ({ ...acc, [label]: false }), {})
  );
  const handleClick = (label: string) => {
    setSelected({ ...selected, [label]: !selected[label] });
  };
  const debouncedSelected = useDebounce(selected, 1000);

  const cssValues = useRef({
    width: '500px',
    height: '100px',
    border: '1px solid black',
    borderRadius: '10px',
    highlightColor: 'lightblue',
    backgroundColor: 'gray',
    padding: '5px',
  });

  useEffect(() => {
    if (debouncedSelected) {
      console.log(debouncedSelected);
    }
  }, [debouncedSelected]);

  return (
    <div
      id='checkbox-wrapper'
      style={{
        width: cssValues.current.width,
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-evenly',
        alignItems: 'baseline safe',
        alignContent: 'flex-start',
        gap: '.5rem .5rem',
      }}
      {...rest}
    >
      {labels.map((label) => (
        <CheckboxSingle
          cssValues={cssValues.current}
          key={label}
          label={label}
          checked={selected[label]}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

const CheckboxSingle = (props: CheckboxSingleProps) => {
  const { label, checked, handleClick } = props;
  return (
    <div id='checkboxSingleWrapper'>
      <div
        id='blurBackground'
        style={{
          padding: '.5rem 1rem',
          opacity: 0.5,
          margin: '.5rem .25rem',
          color: checked ? 'white' : 'black',
          fontSize: '1.5rem',
          backgroundColor: checked ? 'grey' : 'rgba(150,150,150,0.1)',
          position: 'absolute',
          borderRadius: props.cssValues?.borderRadius || '5rem',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {label}
      </div>

      <div
        onClick={() => handleClick(label)}
        style={{
          borderRadius: props.cssValues?.borderRadius || '5rem',
          fontSize: '1.5rem',
          textShadow: '1px 1px 2.25px rgba(0,0,0,0.25)',
          backgroundBlendMode: checked ? 'screen' : 'multiply',
          opacity: 1,
          backdropFilter: 'blur(1.5px)',
          border: props.cssValues?.border || '1px solid black',
          color: checked ? 'white' : 'black',
          backgroundColor: 'rgba(150,150,150,0.0)',
          padding: '.5rem 1rem',
          margin: '.5rem .25rem',
          userSelect: 'none',
          zIndex: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default CheckboxContainer;
