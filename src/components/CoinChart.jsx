import { Line } from "react-chartjs-2";

import { Oval } from "react-loader-spinner";
import {
  CategoryScale,
  Chart,
  controllers,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";

import { useState } from "react";
import { useEffect } from "react";
import { Alert, Stack } from "@mui/material";
import { BorderColor, Dataset } from "@mui/icons-material";

Chart.register(
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip
);
const CoinChart = ({ id }) => {
  const key = import.meta.env.VITE_COIN_API;
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const FetchChartData = async () => {
      try {
        const res = await fetch(
          `${key}/${id}/market_chart?vs_currency=usd&days=7`,
          { signal }
        );
        const data = await res.json();
        const price = data.prices.map((price) => ({
          x: price[0],
          y: price[1],
        }));
        setChart({
          datasets: [
            {
              label: `Price (USD)`,
              data: price,
              fill: true,
              BorderColor: "#007bff",
              poinRadius: 0,
              tension: 0.3,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch failed:", error);
          setError(error.message || "Some thing went wrong");
          setLoading(false);
        }
      }
    };
    FetchChartData();
    return () => controller.abort();
  }, [id]);

  console.log(chart);

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
      <div className="text-white">
        <Line
          data={chart}
          options={{
            responsive: true,
            borderColor: "rgba(0, 4, 247)",
            backgroundColor: "#fff",
            pointRadius: 0,
            tension: 0.3,
            plugins: {
              legend: {
                display: true,
                labels: { color: "#fff" },
              },
              tooltip: {
                mode: "index",
                intersect: false,
                titleColor: "#fff",
                bodyColor: "#fff",
                backgroundColor: "rgba(0,0,0,0.7)",
              },
            },
            scales: {
              x: {
                type: "time",
                time: { unit: "day" },
                ticks: {
                  color: "#fff", // white text on X axis
                  autoSkip: true,
                  maxTicksLimit: 16,
                },
                grid: {
                  color: "rgba(255,255,255,0.1)", // subtle white gridlines
                },
              },
              y: {
                ticks: {
                  color: "#fff", // white text on Y axis
                  callback: (value) => `$${value.toLocaleString()}`,
                },
                grid: {
                  color: "rgba(255,255,255,0.1)",
                },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default CoinChart;
