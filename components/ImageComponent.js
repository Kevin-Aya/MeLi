import Image from "next/image";

export default function ImageComponent({ url, title, width, height }) {
  const loader = ({ src }) => {
    return `http://http2.mlstatic.com${src}`;
  };
  return (
    <Image
      loader={loader}
      src={url}
      width={width}
      height={height}
      alt={title}
      layout="intrinsic"
      objectFit="contain"
      className="image"
      decoding="async"
    />
  );
}