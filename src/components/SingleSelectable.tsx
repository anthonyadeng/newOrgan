import { useEffect, useRef, useState } from 'react';
import useDebounce from '../util/useDebounce';
import { css } from '@emotion/react';

type SingleSelectableProps = {
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

const SingleSelectable = (props: SingleSelectableProps) => {
  const { label, checked, handleClick } = props;
  return (
    <div id='singleSelectableWrapper'>
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

export default SingleSelectable;
