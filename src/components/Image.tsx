type ImageProps = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.SyntheticEvent) => void;
};

const Image = (props: ImageProps) => {
  const { src, alt, ...rest } = props;
  return <img src={src} alt={alt} {...rest} />;
};

export default Image;
