import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TICKETMASTER_API!;

const KeywordAutocomplete = ({ onSelect }: { onSelect: (keyword: string) => void }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    if (inputValue.length < 2) {
      setOptions([]); // Clear options if input is too short
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/suggest`, {
          params: {
            apikey: API_KEY,
            keyword: inputValue,
          },
        });

        // Extract suggestions
        const suggestions =
          response.data._embedded?.attractions?.map((item: any) => item.name) || [];

        setOptions(suggestions);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 500); // Debounce API call

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(_, newValue) => {
        setInputValue(newValue)
        onSelect(newValue || "")
      }}
      renderOption={(props, option, { index }) => (
        <li {...props} key={`${option}-${index}`}>{option}</li> // ✅ Unique key
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Keyword"
          variant="outlined"
          sx={{
            "& .MuiInputBase-input": {
              color: "white", // Ensure input text is white
            },
            "& .MuiInputLabel-root": {
              color: "lightgray", // Ensure label text is white
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Border color
              },
              "&:hover fieldset": {
                borderColor: "lightgray", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Border color when focused
                color: "white"
              },
            },
          }}
        />
      )}
    />
  );
};

export default KeywordAutocomplete;
