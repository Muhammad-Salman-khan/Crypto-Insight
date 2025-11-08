import { useState, useEffect, useRef } from "react";
import { Oval } from "react-loader-spinner";
import Navbar from "./components/Navbar.jsx";
import Option from "./components/Option.jsx";
import Search from "./components/Search.jsx";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CryptoCard from "./components/CryptoCard.jsx";
import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound.jsx";
const App = () => {
  const key = import.meta.env.VITE_API_KEY;

  const refPages = useRef(null);
  const RefItem = useRef(null);
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [item, setItem] = useState(10);
  const [Page, setPage] = useState(1);
  const [Filter, setFilter] = useState("");
  const [DebouncedFilter, setDebouncedFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const SwitchPages = (increment) => {
    clearTimeout(refPages);
    refPages.current = setTimeout(() => setPage(increment), 1000);
  };
  const ExtendItems = (increment) => {
    clearTimeout(RefItem);
    RefItem.current = setTimeout(() => setItem(() => increment), 1000);
  };
  const Sort = (e) => {
    setSortBy(e);
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const Fetch = async () => {
      try {
        const url = DebouncedFilter
          ? `https://api.coingecko.com/api/v3/search?query=${DebouncedFilter}`
          : `${key}&order=${sortBy}&per_page=${item}&page=${Page}&sparkline=false`;
        const res = await fetch(url, { signal });
        if (!res.ok)
          throw new Error(`network error status code: ${res.status}`);
        const data = await res.json();
        setCoin(DebouncedFilter ? data.coins : data);
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch failed:", error);
          setError(error.message || "Some thing went wrong");
          setLoading(false);
        }
      }
    };
    Fetch();
    return () => controller.abort();
  }, [DebouncedFilter, sortBy, Page, item]);

  useEffect(() => {
    const Time = setTimeout(() => setDebouncedFilter(Filter), 500);
    return () => clearTimeout(Time);
  }, [Filter]);

  const FilterdCoins = coin
    ?.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(DebouncedFilter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(DebouncedFilter.toLowerCase())
      );
    })
    .slice();
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
        <Stack
          sx={{
            width: {
              xs: "100%",
              sm: "80%",
              md: "60%",
              lg: "40%",
            },
          }}
          spacing={2}
        >
          <Alert
            severity="error"
            sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
          >
            {error}
          </Alert>
        </Stack>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              FilterdCoins={FilterdCoins}
              SwitchPages={SwitchPages}
              ExtendItems={ExtendItems}
              Sort={Sort}
              search={setFilter}
              coin={coin}
              item={item}
              Page={Page}
              DebouncedFilter={DebouncedFilter}
              sortBy={sortBy}
              setPage={setPage}
              Filter={Filter}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
