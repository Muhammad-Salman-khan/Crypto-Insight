import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import Navbar from "./components/Navbar.jsx";
import Option from "./components/Option.jsx";
import Search from "./components/Search.jsx";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CryptoCard from "./components/CryptoCard.jsx";
const App = () => {
  const key = import.meta.env.VITE_API_KEY;
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(15);
  console.log(page);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const Fetch = async () => {
      try {
        const res = await fetch(
          `${key}&order=market_cap_desc&per_page=${page}&page=12&sparkline=false`,
          { signal }
        );
        if (!res.ok)
          throw new Error(`network error status code: ${res.status}`);
        const data = await res.json();
        setCoin(data);
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
  }, [page]);
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
            <Search />
            <button onClick={() => setPage((e) => e + 5)}>Next</button>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
            <Option />
            <Option />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          {/* ====== CONTROL BAR ====== */}

          {/* ====== CRYPTO CARDS GRID ====== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coin?.map(
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
                />
              )
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
