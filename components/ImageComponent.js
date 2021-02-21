import Image from "next/image";

export default function ImageComponent({url, title, width, height}) {
  const loader = ({src}) => {
    return src;
  };

  return (
    <Image
      loader={loader}
      src={url}
      width={width}
      height={height}
      alt={title}
      objectFit="contain"
      className="image"
      decoding="async"
    />
  );
}
