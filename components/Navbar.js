import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Navbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onClickLogo = () => {
    setSearch("");
    router.push("/");
  };

  const onClickSearch = () => {
    search &&
      search.trim().length &&
      router.push({ pathname: "/items", query: { search } });
  };

  return (
    <>
      <Head>
        <title>Mercado libre</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <header className="row-auto">
        <div className="navbar grid grid-cols-12">
          <div className="col-span-1 sm:hidden md:block md:col-span-1 xl:col-span-2"></div>
          <div className="hidden justify-center sm:flex sm:col-span-2 md:col-span-1 items-center">
            <img
              className="sm:col-span-2 md:col-span-1 h-9"
              src="/logo.png"
              onClick={onClickLogo}
            />
          </div>
          <div className="relative col-span-10 sm:col-span-10 md:col-span-9 xl:col-span-7 ">
            <input
              type="text"
              name="buscador"
              id="buscador"
              className="searchbar"
              placeholder="Nunca dejes de buscar"
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              onKeyPress={(e) => {
                e.key == "Enter" && onClickSearch();
              }}
            />
            <div className="searchButton" onClick={onClickSearch}>
              <img src="/search.png" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
