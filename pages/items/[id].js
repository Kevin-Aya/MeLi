import ImageComponent from "../../components/ImageComponent";
import Container from "../../components/Container";
import constants from "../../constants";
function Detail({ item }) {
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
      <div className="row-auto">
        <div className="grid grid-cols-9">
          <div className="col-span-6 productDetailImage">
            <ImageComponent
              url={picture}
              title={title}
              width={680}
              height={680}
            />
          </div>
          <div />
          <div className="col-span-2 infoContainer">
            <p className="estado">{`${
              constants.TRADUCCIONES.CONDICION[condition]
            } - ${sold_quantity} vendido${
              (sold_quantity != 1 && "s") || ""
            }`}</p>
            <p>{title}</p>
            <p>{amount}</p>
          </div>
        </div>
      </div>
      <div className="row-auto">
        <div className="grid grid-cols-9">
          <div className="col-span-6 descriptionContainer">
            <p className="title">Descripción del producto</p>
            <p
              dangerouslySetInnerHTML={{
                __html: description.replace(/[\r\n]/g, "<br>"),
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
  return { props: { item, notFound: !Object.keys(item).length } };
}

export default Detail;
