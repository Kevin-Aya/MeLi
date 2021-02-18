export default function Container({ children, styles }) {
  return (
    <div className="grid grid-cols-12">
      <div className="sm:col-auto md:col-1 xl:col-span-2" />
      <div
        className={`sm:col-span-12 md:col-span-10 xl:col-span-8 my-4 containerProducts ${
          styles || ""
        }`}>
        {children}
      </div>
    </div>
  );
}
