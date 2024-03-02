type EditButtonProps = {
  handleClick: () => void;
  checked?: boolean;
  label?: string;
};

const EditButton = ({ handleClick, checked, label }: EditButtonProps) => {
  return <button onClick={() => handleClick()}>Edit Me</button>;
};

export default EditButton;
