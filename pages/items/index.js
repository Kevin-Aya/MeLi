import Container from "../../components/Container";

function Items({ userName, search }) {
  return (
    <Container>
      <p>
        Hola {userName} ,estás buscando {search}
      </p>
    </Container>
  );
}
export async function getServerSideProps(context) {
  let {
    query: { search },
  } = context;
  // console.log("Query:", search);
  const res = await fetch(`http://localhost:3000/api/items`);
  const { userName } = await res.json();
  console.log("userName:", userName);
  if (!userName) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      search,
      userName,
    },
  };
}

export default Items;
