import Container from "../../components/Container";
import Product from "../../components/product";
import ProductNotFound from "../../components/ProductNotFound";
import {getItems} from "../../services/meli-api";

export async function getServerSideProps({query: {search}, req}) {
  const props = await getItems(req, search);

  return {props};
}

/**
 * @description Renderiza los items a partir de los props
 * @param {Array[{object}]} data
 * @param {boolean} notFound
 */
function Items({data, notFound}) {
  if (notFound) return <ProductNotFound search />;
  return (
    <Container>
      {data?.items.map((item, index) => (
        <div key={index}>
          <Product item={item} />
          {index != data.items.length && <div className="divider" />}
        </div>
      ))}
    </Container>
  );
}

export default Items;
