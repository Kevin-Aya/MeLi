import Container from "../../components/Container";
import Product from "../../components/product";
import ProductNotFound from "../../components/ProductNotFound";

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
  } = context;
  const res = await fetch(`http://localhost:3000/api/items?search=${search}`);
  const data = await res.json();

  return { props: { data, notFound: !!data?.error }, notFound: false };
}

export default Items;
