const LocationInput = ({ onLocationChange }) => {
  const [manualLocation, setManualLocation] = useState("");

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
        onLocationChange(coords);
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={handleLocation} className="bg-red-500 text-white px-4 py-2 rounded">
        Use My Location
      </button>
      <input
        type="text"
        placeholder="Enter Location"
        value={manualLocation}
        onChange={e => setManualLocation(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <button
        onClick={() => onLocationChange(manualLocation)}
        className="bg-gray-700 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default LocationInput;
