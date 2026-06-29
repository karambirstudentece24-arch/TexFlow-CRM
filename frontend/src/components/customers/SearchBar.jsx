import { FaSearch, FaPlus } from "react-icons/fa";

function SearchBar({
  search,
  setSearch,
  setShowForm,
}) {
  return (
    <div className="customer-header">
      <div className="search-container">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search Customer..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button
        className="add-btn"
        onClick={() => setShowForm(true)}
      >
        <FaPlus />
        Add Customer
      </button>
    </div>
  );
}

export default SearchBar;