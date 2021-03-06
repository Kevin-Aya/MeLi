export default function Container({ children, styles }) {
  return (
    <div className="grid grid-cols-12">
      <div className="sm:col-auto md:col-1 xl:col-span-2" />
      <div
        className={`col-span-12 md:col-span-10 xl:col-span-8 ${styles || ""}`}>
        {children}
      </div>
    </div>
  );
}
