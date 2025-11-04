import { TableCell, TableHead, TableRow } from "@mui/material";

const TableHeader = () => {
  return (
    <>
      <TableHead>
        <TableRow
          sx={{
            backgroundColor: "#000 !important",
            color: "#fff !important",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            border: "1px solid rgb(51, 65, 85)",
          }}
        >
          {[
            "Coin",
            "Current Price",
            "market_cap_change_24h",
            "low_24h",
            "Market Cap   Rank",
            "high_24h",
            "Last Updated",
          ].map((head, i) => (
            <TableCell
              key={head}
              sx={{
                color: "#fff !important",
                borderRight: i !== 4 ? "1px solid rgb(30, 41, 59)" : "none",
                padding: "0.75rem 1rem",
                fontWeight: 600,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
              className="text-xs sm:text-sm md:text-base"
            >
              {head}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
};

export default TableHeader;
