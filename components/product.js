import { useRouter } from "next/router";

import ImageComponent from "../components/ImageComponent";

export default function Product({
  item: { id, title, picture, price, free_shipping, state_name },
}) {
  const router = useRouter();

  const goToDetail = (id) =>
    router.push({ pathname: "/items/[id]", query: { id } });

  return (
    <div className="product">
      <div className="productImage" onClick={() => goToDetail(id)}>
        <ImageComponent url={picture} title={title} width={180} height={180} />
      </div>
      <div className="infoProductContainer">
        <p className="price">
          {price?.amount}
          {free_shipping && <img src="/shipping.png" alt="" />}
        </p>
        <p className="title" onClick={() => goToDetail(id)}>
          {title}
        </p>
      </div>
      <p className="city">{state_name}</p>
    </div>
  );
}
