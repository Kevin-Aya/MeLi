import Container from "../../components/Container";
import Product from "../../components/product";
import ProductNotFound from "../../components/ProductNotFound";
import constants from "./../../constants";
function Items({ data, notFound }) {
  if (notFound) return <ProductNotFound search />;
  return (
    <Container>
      {data?.items.map((item, index) => (
        <>
          <Product key={index} item={item} />
          {index != data.items.length && <div className="divider" />}
        </>
      ))}
    </Container>
  );
}
export async function getServerSideProps(context) {
  let {
    query: { search },
    req,
  } = context;
  const API_URL = req.headers.host;
  const res = await fetch(`https://${API_URL}/api/items?search=${search}`);
  const data = await res.json();

  return { props: { data, notFound: !!data?.error }, notFound: false };
}

export default Items;
