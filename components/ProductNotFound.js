import Container from "./Container";

export default function ProductNotFound({ search }) {
  let message = search ? "Busqueda no encontrada " : "Producto no encontrado";
  return (
    <Container styles="containerProducts heightContainer flex items-center justify-center md:my-4">
      <p className="text-center">{message}</p>
    </Container>
  );
}
