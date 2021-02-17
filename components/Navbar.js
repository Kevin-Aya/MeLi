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
    <div className="bg-indigo-800">
      <Head>
        <title>Mercado libre</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <header className="row-auto">
        <div className="navbar grid grid-cols-12">
          <div className="col-span-1"></div>
          <div className="col-span-1 flex items-center">
            <img
              className="col-span-1 h-9"
              src="/logo.png"
              onClick={onClickLogo}
            />
          </div>
          <div className="relative col-span-9 ">
            <input
              type="text"
              name="buscador"
              id="buscador"
              className="searchbar"
              placeholder="Nunca dejes de buscar"
              value={search}
              onChange={({ target }) => setSearch(target.value)}
            />
            <div className="searchButton" onClick={onClickSearch}>
              <img src="/search.png" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
