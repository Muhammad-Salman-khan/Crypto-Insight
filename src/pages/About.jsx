import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { TrendingUp, Security, Insights } from "@mui/icons-material";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center py-16 px-6">
      <Container maxWidth="lg">
        {/* ===== HEADER ===== */}
        <header className="flex flex-col items-center text-center gap-3 mb-14">
          <Typography
            variant="h3"
            className="font-bold text-4xl sm:text-5xl text-emerald-400 tracking-tight"
          >
            About Crypto Insight
          </Typography>
          <Typography
            variant="h6"
            className="text-gray-300 max-w-2xl leading-relaxed"
          >
            Empowering traders and investors with real-time crypto market
            analytics, trends, and visualization — built for precision, speed,
            and clarity.
          </Typography>
          <div className="w-24 h-1 bg-emerald-400 rounded-full mt-4" />
        </header>

        {/* ===== MISSION SECTION ===== */}
        <section className="flex flex-col md:flex-row items-center gap-8 mb-20">
          <div className="md:w-1/2 text-center md:text-left">
            <Typography
              variant="h4"
              className="font-semibold text-3xl mb-4 text-emerald-300"
            >
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-300 leading-relaxed mb-4"
            >
              At{" "}
              <span className="text-emerald-400 font-medium">
                Crypto Insight
              </span>
              , our mission is to simplify the chaos of cryptocurrency markets
              into actionable intelligence. We harness modern APIs, smart
              caching, and clean UI design to deliver market data that empowers
              every level of investor — from curious beginners to serious
              professionals.
            </Typography>
            <Typography variant="body2" className="text-gray-400">
              Every feature is designed around transparency, performance, and
              long-term trust.
            </Typography>
          </div>

          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1629339942248-45d4b10c8c2f?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1472"
              alt="Crypto analytics dashboard"
              className="rounded-2xl shadow-lg w-full h-80 object-cover"
            />
          </div>
        </section>

        {/* ===== VALUES SECTION ===== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <TrendingUp className="text-emerald-400 text-5xl mb-3" />,
              title: "Real-Time Market Data",
              desc: "Stay updated with live market movements, volume, and advanced crypto metrics — optimized with fast APIs and intelligent caching layers.",
            },
            {
              icon: <Security className="text-emerald-400 text-5xl mb-3" />,
              title: "Transparency & Security",
              desc: "We prioritize data integrity and user trust. No paywalls, no bias — just transparent crypto insights you can rely on.",
            },
            {
              icon: <Insights className="text-emerald-400 text-5xl mb-3" />,
              title: "Intelligent Insights",
              desc: "We visualize trends, volatility, and token correlations with clarity so you can act fast and smart — not guess.",
            },
          ].map((item, i) => (
            <Card
              key={i}
              elevation={6}
              className=" rounded-2xl hover:-translate-y-1 hover:shadow-emerald-500/30 transition-all duration-300"
            >
              <CardContent className="p-6  bg-stone-900 text-white text-center">
                {item.icon}
                <Typography
                  variant="h6"
                  className="text-xl font-semibold mb-2 text-white"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-white leading-relaxed"
                >
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="flex justify-center mt-16">
          <Link to="/">
            <Button
              variant="contained"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              Back to Home
            </Button>
          </Link>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="text-center mt-20 text-gray-500 text-sm">
          © {new Date().getFullYear()} Crypto Insight. All rights reserved.
        </footer>
      </Container>
    </div>
  );
};

export default About;
