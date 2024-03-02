import { useEffect, useRef, useState } from 'react';
import useDebounce from '../util/useDebounce';
import { css } from '@emotion/react';
import EditButton from './EditButton';

type SingleSelectableProps = {
  style?: {
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
  childComponent?: React.ReactNode;
  children?: React.ReactNode;
  editable?: boolean;
  editCallback?: (oldLabel: string, newLabel: string) => void;
  deleteCallback?: (label: string) => void;
  checkable?: boolean;
  deletable: boolean;
};

const SingleSelectable = ({
  deletable = false,
  label,
  checkable,
  checked,
  handleClick,
  editable,
  childComponent,
  editCallback,
  deleteCallback,
  style,
}: SingleSelectableProps) => {
  const [inputMode, setInputMode] = useState(false);
  const [currLabel, setCurrLabel] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputMode]);
  return (
    <div id={'singleSelectableWrapper' + currLabel}>
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
          borderRadius: style?.borderRadius || '5rem',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {currLabel}
      </div>

      <div
        style={{
          borderRadius: style?.borderRadius || '5rem',
          fontSize: '1.5rem',
          textShadow: '1px 1px 2.25px rgba(0,0,0,0.25)',
          backgroundBlendMode: checked ? 'screen' : 'multiply',
          opacity: 1,
          backdropFilter: 'blur(1.5px)',
          border: style?.border || '1px solid black',
          color: checked ? 'white' : 'black',
          backgroundColor: 'rgba(150,150,150,0.0)',
          padding: '.5rem 1rem',
          margin: '.5rem .25rem',
          userSelect: 'none',
          zIndex: 2,
        }}
      >
        {inputMode ? (
          <input
            ref={inputRef}
            type='text'
            defaultValue={currLabel}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (editCallback) {
                  editCallback(label, e.currentTarget.value);
                }
                setCurrLabel(e.currentTarget.value);
                setInputMode(false);
              }
              if (e.key === 'Escape') {
                setInputMode(false);
              }
            }}
            onBlur={(e) => {
              setInputMode(false);
            }}
          />
        ) : (
          currLabel
        )}
        {childComponent ? childComponent : null}
      </div>
      <div id='buttonRowWrapper'>
        {checkable && (
          <div id='checkButtonWrapper'>
            <button onClick={() => handleClick(currLabel)}>Check</button>
          </div>
        )}
        {editable && (
          <EditButton
            checked={checked}
            handleClick={() => {
              setInputMode(!inputMode);
            }}
          />
        )}
        {deletable && deleteCallback && (
          <button id='deleteButton' onClick={() => deleteCallback(label)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleSelectable;
