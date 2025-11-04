import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";
const CryptoCard = ({
  id,
  img,
  name,
  symbol,
  market_cap,
  market_cap_rank,
  price_change_24h,
  low_24h,
  high,
  last_updated,
}) => {
  const isPositive = price_change_24h >= 0;

  const formatMarketCap = (num) => {
    if (!num) return "N/A";
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  return (
    <div
      id={id}
      className={`relative rounded-2xl p-4 border transition-all duration-300 
  bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 
  ${
    isPositive
      ? "border-blue-500/80 border-2 hover:shadow-emerald-400/30"
      : "border-red-500/80 hover:shadow-red-400/30"
  } `}
    >
      {" "}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={img}
            alt={`${name} logo`}
            className="w-10 h-10 object-contain"
            loading="lazy"
          />
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg">{name}</span>
            <span className="text-xs uppercase text-gray-400">{symbol}</span>
          </div>
        </div>
        <span
          className={`flex items-center gap-1  font-bold ${
            isPositive ? "text-green-400" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <TrendingUpIcon fontSize="small" />
          ) : (
            <TrendingDownIcon fontSize="small" />
          )}
          {isPositive ? "+" : ""}
          {price_change_24h.toFixed(2) || 0}%
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
        <div className="flex flex-col">
          <span className="text-x text-white font-bold">Market Cap</span>
          <span className="text-white font-bold">
            {formatMarketCap(market_cap)}
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xs text-white font-bold">Rank</span>
          <span className=" text-white font-bold">#{market_cap_rank}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-white">24h Low</span>
          <span className="text-red-600 font-bold">
            $
            {Intl.NumberFormat("en-US", {
              maximumFractionDigits: 2,
            }).format(low_24h)}
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xs text-gray-500">24h High</span>
          <span className="text-green-400">
            $
            {Intl.NumberFormat("en-US", {
              maximumFractionDigits: 2,
            }).format(high)}
          </span>
        </div>
      </div>
      <div className="mt-4 text-[11px] text-gray-500 text-right">
        {Intl.DateTimeFormat("en-US", {
          weekday: "short",
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }).format(new Date(last_updated))}
      </div>
    </div>
  );
};

export default CryptoCard;
