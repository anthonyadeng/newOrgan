import Image from './Image';

type GalleryProps = {
  images: string[];
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.SyntheticEvent) => void;
};

const Gallery = (props: GalleryProps) => {
  const { images, ...rest } = props;
  return (
    <div>
      {images.map((image) => (
        <Image src={image} alt={image} {...rest} />
      ))}
    </div>
  );
};
