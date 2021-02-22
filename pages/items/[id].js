import ImageComponent from "../../components/ImageComponent";
import Container from "../../components/Container";
import constants from "../../constants";
import ProductNotFound from "../../components/ProductNotFound";
import { getItemById } from "../../services/meli-api";
import Breadcrum from "../../components/Breadcrum";

export async function getServerSideProps({ query: { id }, req }) {
  const props = await getItemById(req, id);

  return { props };
}

/**
 * @description Renderiza el item a partir los props
 * @param {object} item
 * @param {boolean} notFound
 */
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
      categories,
    },
  } = item;

  return (
    <div>
      {categories && categories.length && <Breadcrum categories={categories} />}

      <Container styles="containerProducts containerDetail sm:my-4">
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
                constants.TRANSALATE.CONDICION[condition]
              } - ${sold_quantity} vendido${
                (sold_quantity != 1 && "s") || ""
              }`}</p>
              <p className="title">{title}</p>
              <p className="price hidden sm:text-sm md:text-base lg:flex">
                {amount}
                {free_shipping && (
                  <img src="/shipping.png" alt="Envio gratis" />
                )}
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
                {free_shipping && (
                  <img src="/shipping.png" alt="Envio gratis" />
                )}
              </p>
              <input className="buttonBlue" type="button" value="Comprar" />
            </div>
          </div>
        </div>
        <div className="row-auto">
          <div className="grid grid-cols-9">
            <div className="col-span-9 lg:col-span-6 descriptionContainer">
              <p className="title">Descripción del producto</p>
              <p
                className="description"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Detail;
