import { useState, useEffect, useRef } from "react";
import { Oval } from "react-loader-spinner";
import Navbar from "./components/Navbar.jsx";
import Option from "./components/Option.jsx";
import Search from "./components/Search.jsx";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CryptoCard from "./components/CryptoCard.jsx";
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
  const SwitchPages = (increment) => {
    clearTimeout(refPages);
    refPages.current = setTimeout(() => setPage(increment), 1000);
  };
  const ExtendItems = (increment) => {
    clearTimeout(RefItem);
    RefItem.current = setTimeout(() => setItem(() => increment), 1000);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const Fetch = async () => {
      try {
        const url = DebouncedFilter
          ? `https://api.coingecko.com/api/v3/search?query=${DebouncedFilter}`
          : `${key}&order=market_cap_desc&per_page=${item}&page=${Page}&sparkline=false`;
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
  }, [DebouncedFilter, Page, item]);

  useEffect(() => {
    const Time = setTimeout(() => setDebouncedFilter(Filter), 500);
    return () => clearTimeout(Time);
  }, [Filter]);

  const FilterdCoins = coin?.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(DebouncedFilter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(DebouncedFilter.toLowerCase())
    );
  });
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
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 min-h-screen flex flex-col">
        {/* ====== MAIN CONTENT ====== */}
        <Navbar />
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 bg-gray-950  p-5 rounded-md shadow-lg mb-8  w-full transition-all duration-300 hover:shadow-emerald-500/10">
          {/* Left group: Options + Search */}
          <div className="w-full px-4 sm:max-w-2xl sm:mx-auto md:w-fit md:mx-0 lg:max-w-4xl">
            <Search value={Filter} search={setFilter} />
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
            <span> Show Limit:</span>
            <Option
              Set={(e) => ExtendItems(e)}
              value={item}
              option={[
                { key: 5, value: 5 },
                { key: 10, value: 10 },
                { key: 20, value: 20 },
                { key: 40, value: 40 },
                { key: 50, value: 50 },
                { key: 80, value: 80 },
              ]}
            />
            <span> Show page:</span>
            <Option
              Set={(e) => SwitchPages(e)}
              value={Page}
              option={[
                { key: 1, value: 1 },
                { key: 2, value: 2 },
                { key: 3, value: 3 },
                { key: 4, value: 4 },
                { key: 5, value: 5 },
                { key: 6, value: 6 },
                { key: 7, value: 7 },
                { key: 8, value: 8 },
                { key: 9, value: 9 },
                { key: 10, value: 10 },
              ]}
            />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          {/* ====== CONTROL BAR ====== */}

          {/* ====== CRYPTO CARDS GRID ====== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {FilterdCoins.length > 0 ? (
              FilterdCoins.map(
                ({
                  id,
                  image,
                  last_updated,
                  low_24h,
                  market_cap,
                  market_cap_rank,
                  name,
                  price_change_24h,
                  symbol,
                  high_24h,
                  ath_date,
                  api_symbol,
                  large,
                  thumb,
                }) => (
                  <CryptoCard
                    key={id}
                    img={image}
                    last_updated={last_updated}
                    low_24h={low_24h}
                    name={name}
                    ath_date={ath_date}
                    symbol={symbol}
                    market_cap_rank={market_cap_rank}
                    market_cap={market_cap}
                    high={high_24h}
                    price_change_24h={price_change_24h}
                    thumb={thumb}
                    large={large}
                    api_symbol={api_symbol}
                  />
                )
              )
            ) : (
              <span> No Search found</span>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
