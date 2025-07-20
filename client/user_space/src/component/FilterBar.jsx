const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl mx-6 -mt-10 p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6 z-10 relative">
      {/* Location Input */}
      <input
        type="text"
        name="location"
        value={filters.location}
        onChange={handleChange}
        placeholder="Enter your location (e.g. Delhi)"
        className="w-full md:w-1/4 px-4 py-2 border border-green-500 text-gray-800 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      />

      {/* Cuisine Filter */}
      <select
        name="cuisine"
        value={filters.cuisine}
        onChange={handleChange}
        className="w-full md:w-1/4 px-4 py-2 border border-green-500 text-gray-800 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      >
        <option value="">All Cuisines</option>
        <option value="indian">Indian</option>
        <option value="chinese">Chinese</option>
        <option value="italian">Italian</option>
        <option value="fast food">Fast Food</option>
      </select>

      {/* Sort Filter */}
      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={handleChange}
        className="w-full md:w-1/4 px-4 py-2 border border-green-500 text-gray-800 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      >
        <option value="">Sort By</option>
        <option value="rating">Rating</option>
        <option value="deliveryTime">Delivery Time</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
};

export default FilterBar;
