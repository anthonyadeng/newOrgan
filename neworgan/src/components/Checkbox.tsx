import { useEffect, useState } from 'react';
import useDebounce from '../util/useDebounce';
type CheckboxContainerProps = {
  labels: string[];
  //   onChange?: (e: React.SyntheticEvent) => void;
};

type CheckboxSingleProps = {
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

  useEffect(() => {
    if (debouncedSelected) {
      console.log(debouncedSelected);
    }
  }, [debouncedSelected]);

  return (
    <div>
      {labels.map((label) => (
        <CheckboxSingle
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
    <div
      onClick={() => handleClick(label)}
      style={{ backgroundColor: checked ? 'blue' : 'white' }}
    >
      {label}
    </div>
  );
};

export default CheckboxContainer;
