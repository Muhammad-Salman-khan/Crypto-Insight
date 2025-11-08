import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Oval } from "react-loader-spinner";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Divider,
} from "@mui/material";
const CoinDetails = () => {
  const { id } = useParams();
  const Key = import.meta.env.VITE_COIN_API;
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name } = useParams();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const FetchedCoin = async () => {
      try {
        const res = await fetch(`${Key}/${id}`, { signal });
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
    FetchedCoin();
    return () => controller.abort();
  }, [id]);
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
          className={` bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105`}
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
      <div className="min-h-screen flex justify-center align-middle items-center p-2 max-w-screen bg-gray-900 text-white">
        <div className="max-w-md w-full shadow-2xl rounded-3xl bg-stone-950 text-white">
          <div className="flex justify-end align-middle items-center p-3">
            <Link to="/">
              <button
                className="bg-white text-purple-700 p-2 rounded-lg font-semibold 
            hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-100 
            dark:hover:bg-gray-600 transition"
              >
                back
              </button>
            </Link>
          </div>
          <CardContent className="flex flex-col items-center space-y-6">
            {/* --- Top: Image + Name --- */}
            <img
              src={coin.image && coin.image.large}
              alt={coin.name}
              className="w-28 h-28 rounded-full shadow-xl border-2 border-gray-600"
            />
            <Typography variant="h4" className="font-bold text-center">
              {coin.name}{" "}
              <span className="text-white text-lg">
                ({coin.symbol ? coin.symbol.toUpperCase() : ""})
              </span>
            </Typography>

            {/* --- Rank Badge --- */}
            <Chip
              label={`Rank #${
                coin.market_data && coin.market_data.market_cap_rank
                  ? coin.market_data.market_cap_rank
                  : "N/A"
              }`}
              sx={{ color: "#ffffff", fontWeight: "600" }}
            />

            <Divider className="w-full border-gray-600 my-4" />

            {/* --- Market Stats --- */}
            <div className="w-full grid grid-cols-2 gap-3 text-center">
              <div>
                <Typography variant="body2" className="text-white">
                  💰 Current Price
                </Typography>
                <Typography
                  variant="h6"
                  className="text-green-400 font-semibold"
                >
                  {coin.market_data &&
                  coin.market_data.current_price &&
                  coin.market_data.current_price.usd
                    ? "$" + coin.market_data.current_price.usd.toLocaleString()
                    : "N/A"}
                </Typography>
              </div>

              <div>
                <Typography variant="body2" className="text-white">
                  📈 24h High
                </Typography>
                <Typography variant="h6" className="text-green-300">
                  {coin.market_data &&
                  coin.market_data.high_24h &&
                  coin.market_data.high_24h.usd
                    ? "$" + coin.market_data.high_24h.usd.toLocaleString()
                    : "N/A"}
                </Typography>
              </div>

              <div>
                <Typography variant="body2" className="text-white">
                  📉 24h Low
                </Typography>
                <Typography variant="h6" className="text-red-400">
                  {coin.market_data &&
                  coin.market_data.low_24h &&
                  coin.market_data.low_24h.usd
                    ? "$" + coin.market_data.low_24h.usd.toLocaleString()
                    : "N/A"}
                </Typography>
              </div>

              <div>
                <Typography variant="body2" className="text-white">
                  💹 Market Cap
                </Typography>
                <Typography variant="h6" className="text-blue-300">
                  {coin.market_data &&
                  coin.market_data.market_cap &&
                  coin.market_data.market_cap.usd
                    ? "$" + coin.market_data.market_cap.usd.toLocaleString()
                    : "N/A"}
                </Typography>
              </div>

              <div>
                <Typography variant="body2" className="text-white">
                  📊 24h Volume
                </Typography>
                <Typography variant="h6" className="text-purple-300">
                  {coin.market_data &&
                  coin.market_data.total_volume &&
                  coin.market_data.total_volume.usd
                    ? "$" + coin.market_data.total_volume.usd.toLocaleString()
                    : "N/A"}
                </Typography>
              </div>

              <div>
                <Typography variant="body2" className="text-white">
                  🌐 Fully Diluted Valuation
                </Typography>
                <Typography variant="h6" className="text-indigo-300">
                  {coin.market_data &&
                  coin.market_data.fully_diluted_valuation &&
                  coin.market_data.fully_diluted_valuation.usd
                    ? "$" +
                      coin.market_data.fully_diluted_valuation.usd.toLocaleString()
                    : "N/A"}
                </Typography>
              </div>

              <div>
                <Typography variant="body2" className="text-white">
                  24h Change
                </Typography>
                <Typography
                  variant="h6"
                  className={`font-semibold ${
                    coin.market_data &&
                    coin.market_data.price_change_percentage_24h >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {coin.market_data &&
                  typeof coin.market_data.price_change_percentage_24h ===
                    "number"
                    ? coin.market_data.price_change_percentage_24h.toFixed(2) +
                      "%"
                    : "N/A"}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" className="text-white">
                  Categories
                </Typography>
                <Typography
                  variant="p"
                  className={`font-semibold ${
                    coin.categories && coin.categories.length > 0
                      ? "text-green-400 text-[15px]"
                      : "text-red-400"
                  }`}
                >
                  {coin.categories && coin.categories
                    ? coin.categories.splice(0, 3).join(", ")
                    : "N/A"}
                </Typography>
              </div>
            </div>

            <Divider className="w-full border-gray-600 my-4" />

            {/* --- Other Info --- */}
            <Typography variant="body2" className="text-gray-300">
              ⛏ Algorithm: {coin.hashing_algorithm || "N/A"}
            </Typography>
            <Typography variant="body2" className="text-gray-300">
              📅 Genesis Date: {coin.genesis_date || "Unknown"}
            </Typography>

            {/* --- Description --- */}
            <Typography
              variant="body2"
              className="text-sm text-white text-center line-clamp-4"
            >
              {coin.description && coin.description.en
                ? coin.description.en
                : "No description available."}
            </Typography>

            {/* --- Links --- */}
            <div className="flex flex-wrap justify-center gap-3 pt-3">
              {coin.links && coin.links.homepage && coin.links.homepage[0] && (
                <Button
                  href={coin.links.homepage[0]}
                  target="_blank"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Website
                </Button>
              )}
              {coin.links && coin.links.twitter_screen_name && (
                <Button
                  href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                  target="_blank"
                  variant="outlined"
                  color="info"
                  size="small"
                >
                  Twitter
                </Button>
              )}
              {coin.links && coin.links.subreddit_url && (
                <Button
                  href={coin.links.subreddit_url}
                  target="_blank"
                  variant="outlined"
                  color="secondary"
                  size="small"
                >
                  Reddit
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </>
  );
};

export default CoinDetails;
