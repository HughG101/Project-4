function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label htmlFor="breed-search">Search by breed:</label>

      <input
        id="breed-search"
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Example: Bengal"
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;