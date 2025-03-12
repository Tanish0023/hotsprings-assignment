import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import KeywordAutocomplete from "./KeywordAutocomplete";
import { Checkbox } from "@mui/material";
import axios from "axios";

const eventSchema = z.object({
  keyword: z.string().min(3, "Event name must be at least 3 characters."),
  distance: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => !val || val > 0, { message: "Distance must be a positive number" }),
  category: z.enum(["music", "sports", "arts", "film", "misc"], {
    errorMap: () => ({ message: "Please select a valid category." }),
  }),
  location: z.string().nonempty("Location is required"),
});

type EventFormData = z.infer<typeof eventSchema>;

interface EventSearchFormProps {
  onSubmit: (eventData: EventFormData) => Promise<void>; // Function to handle form submission
}

const EventSearchForm = ({ onSubmit }: EventSearchFormProps) => {
  const [useMyLocation, setUseMyLocation] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  // Function to Auto-Detect Location
  const autoDetectLocation = async (checked: boolean) => {
    setUseMyLocation(checked);

    if (checked) {
      try {
        const response = await axios.get("https://ipinfo.io/json");
        const { city, region, country, loc } = response.data;

        const [latitude, longitude] = loc.split(",");
        const formattedLocation = `${city}, ${region}, ${country} (${latitude},${longitude})`;

        setValue("location", formattedLocation);
      } catch (error) {
        console.error("Error detecting location:", error);
      }
    } else {
      setValue("location", ""); // Reset location if unchecked
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="backdrop-blur-2xl border border-white/30 text-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Event Search</h2>
      <hr className="border-gray-300 mb-6" />

      <KeywordAutocomplete onSelect={(keyword) => setValue("keyword", keyword)} />

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Distance Input */}
        <div>
          <label className="block font-semibold">Distance (miles)</label>
          <input
            type="text"
            {...register("distance")}
            placeholder="Enter distance"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 bg-transparent"
          />
          {errors.distance && <p className="text-red-500 text-sm">{errors.distance.message}</p>}
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block font-semibold">Category</label>
          <select
            {...register("category")}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 bg-transparent"
          >
            <option value="" className="text-black">Select a category</option>
            <option value="music" className="text-black">Music</option>
            <option value="sports" className="text-black">Sports</option>
            <option value="arts" className="text-black">Arts & Theatre</option>
            <option value="film" className="text-black">Film</option>
            <option value="misc" className="text-black">Miscellaneous</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
      </div>

      {/* Location Input & Auto-Detect Checkbox */}
      <div>
        <label className="block font-semibold">Location</label>
        <input
          type="text"
          {...register("location")}
          placeholder="Enter location"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 bg-transparent"
          disabled={useMyLocation} // Disable input if auto-detect is enabled
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

        <div className="mt-2 flex items-center">
          <Checkbox
            size="small"
            checked={useMyLocation}
            onChange={(e) => autoDetectLocation(e.target.checked)}
            sx={{ '& .MuiSvgIcon-root': { color: "white" } }}
          />
          <span className="text-sm">Auto-detect your location</span>
        </div>
      </div>

      {/* Submit & Clear Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full transition duration-300"
        >
          Search Event
        </button>
        <button
          type="button"
          onClick={() => {
            reset();
            setUseMyLocation(false);
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 w-full transition duration-300"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default EventSearchForm;
