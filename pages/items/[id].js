import ImageComponent from "../../components/ImageComponent";
import Container from "../../components/Container";
import constants from "../../constants";
import ProductNotFound from "../../components/ProductNotFound";

function Detail({ item, notFound }) {
  if (notFound) return <ProductNotFound />;

  let {
    item: {
      title,
      price: { amount },
      picture,
      condition,
      free_shipping,
      sold_quantity,
      description,
    },
  } = item;

  return (
    <Container styles="containerDetail">
      <div className="grid-rows-2">
        <div className="grid grid-cols-9">
          <div className="col-span-9 lg:col-span-6 productDetailImage">
            <ImageComponent
              url={picture}
              title={title}
              width={680}
              height={680}
            />
          </div>
          <div className="col-span-9 lg:col-span-3 infoContainer">
            <p className="estado">{`${
              constants.TRADUCCIONES.CONDICION[condition]
            } - ${sold_quantity} vendido${
              (sold_quantity != 1 && "s") || ""
            }`}</p>
            <p className="title">{title}</p>
            <p className="price hidden sm:text-sm md:text-base lg:flex">
              {amount}
              {free_shipping && <img src="/shipping.png" alt="Envio gratis" />}
            </p>
            <input
              className="buttonBlue  hidden lg:block"
              type="button"
              value="Comprar"
            />
          </div>
          <div className="col-span-9 lg:hidden infoContainerPay  sm:text-sm md:text-base">
            <p className="price">
              {amount}
              {free_shipping && <img src="/shipping.png" alt="Envio gratis" />}
            </p>
            <input className="buttonBlue" type="button" value="Comprar" />
          </div>
        </div>
      </div>
      <div className="row-auto">
        <div className="grid grid-cols-9">
          <div className="col-span-6 descriptionContainer">
            <p className="title">Descripción del producto</p>
            <p
              className="description"
              dangerouslySetInnerHTML={{
                __html: description?.replace(/[\r\n]/g, "<br>"),
              }}></p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getServerSideProps(context) {
  let {
    query: { id },
  } = context;
  const res = await fetch(`http://localhost:3000/api/items/${id}`);
  const item = await res.json();
  return { props: { item, notFound: !!item?.error }, notFound: false };
}

export default Detail;
