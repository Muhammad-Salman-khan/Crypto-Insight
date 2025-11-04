import { FormControl, MenuItem, Select } from "@mui/material";

const Option = ({ option, Set, value }) => {
  return (
    <FormControl
      size="small"
      className="min-w-[150px] bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
    >
      <Select
        labelId="filter-select-label"
        id="filter-select"
        label="Filter Search"
        value={value}
        className="text-sm shrink dark:text-gray-200"
        onChange={(e) => Set(e.target.value)}
        sx={{
          color: "inherit",
          ".MuiOutlinedInput-notchedOutline": { border: "none" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      >
        {option.map(({ key, value }) => (
          <MenuItem id={key} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Option;
