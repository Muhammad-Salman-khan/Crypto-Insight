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
  Alert,
  Stack,
} from "@mui/material";
import CoinChart from "../components/CoinChart.jsx";
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
      <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-900 via-stone-900 to-black text-white p-4">
        <div className="w-full max-w-lg backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex justify-end items-center p-5 ">
            <Link to="/">
              <button className="px-3 py-1.5 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold text-sm transition-all">
                ← Back
              </button>
            </Link>
          </div>

          <CardContent className="flex flex-col items-center space-y-6 p-6">
            <div className="flex flex-col items-center space-y-2">
              <img
                src={coin.image?.large}
                alt={coin.name}
                className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg"
              />
              <Typography
                variant="h4"
                className="font-extrabold text-center text-white drop-shadow-md"
              >
                {coin.name}{" "}
                <span className="text-purple-300 text-lg">
                  ({coin.symbol?.toUpperCase()})
                </span>
              </Typography>
              <Chip
                label={`Rank #${coin.market_data?.market_cap_rank ?? "N/A"}`}
                sx={{
                  backgroundColor: "rgba(147, 51, 234, 0.2)",
                  color: "#E9D5FF",
                  fontWeight: 600,
                }}
              />
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-2 gap-5 w-full text-center mt-4">
              {[
                ["💰 Price", coin.market_data?.current_price?.usd, "green-400"],
                ["📈 24h High", coin.market_data?.high_24h?.usd, "green-300"],
                ["📉 24h Low", coin.market_data?.low_24h?.usd, "red-400"],
                [
                  "💹 Market Cap",
                  coin.market_data?.market_cap?.usd,
                  "blue-400",
                ],
                [
                  "📊 24h Volume",
                  coin.market_data?.total_volume?.usd,
                  "purple-400",
                ],
                [
                  "🌐 FDV",
                  coin.market_data?.fully_diluted_valuation?.usd,
                  "indigo-400",
                ],
              ].map(([label, value, color]) => (
                <div
                  key={label}
                  className="bg-white/5 p-3 rounded-2xl hover:bg-white/10 transition-all"
                >
                  <p className="text-gray-300 text-sm">{label}</p>
                  <p className={`text-${color} text-lg font-semibold`}>
                    {value ? "$" + value.toLocaleString() : "N/A"}
                  </p>
                </div>
              ))}
            </div>

            {/* 24h Change + Categories */}
            <div className="flex justify-between items-center w-full mt-2 px-2">
              <p
                className={`font-bold ${
                  coin.market_data?.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.market_data?.price_change_percentage_24h
                  ? coin.market_data.price_change_percentage_24h.toFixed(2) +
                    "%"
                  : "N/A"}
              </p>
              <p className="text-gray-300 text-sm">
                {coin.categories?.slice(0, 3).join(", ") || "N/A"}
              </p>
            </div>

            <Divider className="w-full border-white/10 my-4" />

            {/* Info */}
            <div className="space-y-1 text-sm text-gray-300 text-center">
              <p>⛏ Algorithm: {coin.hashing_algorithm || "N/A"}</p>
              <p>📅 Genesis: {coin.genesis_date || "Unknown"}</p>
            </div>

            {/* Description */}
            <Typography
              variant="body2"
              className="text-sm text-gray-200 text-center line-clamp-4 mt-4 italic"
            >
              {coin.description?.en || "No description available."}
            </Typography>

            {/* Chart */}
            <div className="mt-6  w-full">
              <CoinChart id={id} />
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {coin.links?.homepage?.[0] && (
                <Button
                  href={coin.links.homepage[0]}
                  target="_blank"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Website
                </Button>
              )}
              {coin.links?.twitter_screen_name && (
                <Button
                  href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                  target="_blank"
                  className="bg-sky-600 hover:bg-sky-700 text-white"
                >
                  Twitter
                </Button>
              )}
              {coin.links?.subreddit_url && (
                <Button
                  href={coin.links.subreddit_url}
                  target="_blank"
                  className="bg-orange-600 hover:bg-orange-700 text-white"
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
