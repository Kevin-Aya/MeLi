export default function Container({ children }) {
  return (
    <div className="grid grid-cols-12">
      <div />
      <div className="col-span-10">{children}</div>
    </div>
  );
}
