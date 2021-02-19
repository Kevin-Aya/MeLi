import Container from "./Container";

export default function ProductNotFound({ search }) {
  let message = search ? "Busqueda no encontrada " : "Producto no encontrado";
  return (
    <Container styles="heightContainer flex items-center justify-center">
      <p>{message}</p>
    </Container>
  );
}
