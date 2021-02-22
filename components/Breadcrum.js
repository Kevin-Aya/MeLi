import Container from "./Container";

export default function Breadcrum({ categories = [] }) {
  return (
    <Container styles="hidden sm:block mt-4">
      <div className="flex flex-row ml-2 md:ml-0">
        {categories.map(({ name }, index) => (
          <div className="flex items-center" key={index}>
            <p>{name} </p>
            {index + 1 != categories.length && (
              <i className="mx-2 iconBreadcrum">&#8250;</i>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
