export default function SearchBar() {
  return (
    <form
      className="flex w-full flex-grow-1"
      role="search"
      style={{ maxWidth: "600px" }}
    >
      <input
        className="form-input flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button
        className="bg-transparent border-2 border-green-500 text-green-500 px-4 py-2 rounded-r-md hover:bg-green-500 hover:text-white transition-colors"
        type="submit"
        style={{ minWidth: "80px" }}
      >
        Search
      </button>
    </form>
  );
}
