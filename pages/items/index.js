import Container from "../../components/Container";
import Product from "../../components/product";

function Items({ data, notFound }) {
  return (
    <Container>
      {notFound ? (
        <p className="notFound">Busqueda no encontrada 😔</p>
      ) : (
        data?.items.map((item, index) => (
          <>
            <Product key={index} item={item} />
            {index != data.items.length && <div className="divider"></div>}
          </>
        ))
      )}
    </Container>
  );
}
export async function getServerSideProps(context) {
  let {
    query: { search },
  } = context;
  const res = await fetch(`http://localhost:3000/api/items?search=${search}`);
  const data = await res.json();

  return { props: { data, notFound: !Object.keys(data).length } };
}

export default Items;
