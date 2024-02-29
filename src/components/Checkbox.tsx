import { useEffect, useRef, useState } from 'react';
import useDebounce from '../util/useDebounce';
import { css } from '@emotion/react';
import SingleSelectable from './SingleSelectable';
type CheckboxContainerProps = {
  labels: string[];
  //   onChange?: (e: React.SyntheticEvent) => void;
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
        <SingleSelectable
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

export default CheckboxContainer;
