import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";

const KeywordAutocomplete = ({ onSelect }: { onSelect: (keyword: string) => void }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue.length < 2) {
      setOptions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/suggestions/`, {
          params: { keyword: inputValue },
        });

        setOptions(response.data.suggestions);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(_, newValue) => {
        setInputValue(newValue);
        onSelect(newValue || "");
      }}
      renderOption={(props, option, { index }) => (
        <li {...props} key={`${option}-${index}`}>{option}</li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Keyword"
          variant="outlined"
          sx={{
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputLabel-root": { color: "lightgray" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "lightgray" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />
      )}
    />
  );
};

export default KeywordAutocomplete;
