import { Oval } from "react-loader-spinner";
import Navbar from "../components/Navbar.jsx";
import Option from "../components/Option.jsx";
import Search from "../components/Search.jsx";
import CryptoCard from "../components/CryptoCard.jsx";
const Home = ({
  item,
  Page,
  sortBy,
  Filter,
  search,
  FilterdCoins,
  SwitchPages,
  ExtendItems,
  Sort,
}) => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 min-h-screen flex flex-col">
        {/* ====== MAIN CONTENT ====== */}
        <Navbar />
        <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-4 bg-gray-950 p-5 rounded-md shadow-lg mb-8 transition-all duration-300 hover:shadow-emerald-500/10">
          {/* Left: Search */}
          <div className="w-full md:flex-1 px-2 sm:max-w-xl lg:max-w-2xl">
            <Search value={Filter} search={(e) => search(e)} />
          </div>

          {/* Right: Options */}
          <div className="flex flex-col md:flex-row md:flex-nowrap items-center justify-start gap-3 w-full md:w-auto">
            <span className="whitespace-nowrap">Sort By:</span>
            <Option
              Set={(e) => Sort(e)}
              value={sortBy}
              option={[
                { key: "market_cap_desc", value: "market_cap_desc" },
                { key: "market_cap_asc", value: "market_cap_asc" },
              ]}
            />

            <span className="whitespace-nowrap">Show Limit:</span>
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
              className=""
            />

            <span className="whitespace-nowrap">Show Page:</span>
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

export default Home;
