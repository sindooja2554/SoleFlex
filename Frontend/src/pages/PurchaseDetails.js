import React, { useState, useEffect, useContext } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import AuthContext from "../AuthContext";

function PurchaseDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // For global search
  const [filteredPurchases, setFilteredPurchases] = useState([]); // Filtered data for search
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const itemsPerPage = 10; // Max rows per page
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" }); // For sorting

  const authContext = useContext(AuthContext);
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPurchaseData();
    fetchProductsData();
  }, [updatePage]);

  useEffect(() => {
    applyFilters(); // Apply search and sorting whenever data or search term changes
  }, [purchase, searchTerm, sortConfig]);

  // Fetching Data of All Purchase items
  const fetchPurchaseData = () => {
    fetch(`http://localhost:4000/api/purchase/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllPurchaseData(data);
        setFilteredPurchases(data); // Initialize filtered data
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Handle Search
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  // Apply Filters (Search + Sorting)
  const applyFilters = () => {
    let filtered = [...purchase];

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((item) => {
        return (
          item.Product?.name.toLowerCase().includes(search) ||
          item.QuantityPurchased.toString().includes(search) ||
          item.PurchaseDate.toLowerCase().includes(search) ||
          item.TotalPurchaseAmount.toString().includes(search)
        );
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    setFilteredPurchases(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Handle Sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPurchases = filteredPurchases.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredPurchases.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddPurchaseDetails
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {/* Search Box */}
        <div className="flex justify-between items-center">
  <span className="font-bold">Purchase Details</span>
  <div className="flex items-center gap-4">
    <div className="flex items-center px-2 border-2 rounded-md">
      <img
        alt="search-icon"
        className="w-5 h-5"
        src={require("../assets/search-icon.png")}
      />
      <input
        className="border-none outline-none focus:border-none text-xs"
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={handleSearchTerm}
      />
    </div>
    {localStorageData.role === 0 && (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addSaleModalSetting}
      >
        Place Order
      </button>
    )}
  </div>
</div>
        {/* Table */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort("Product.name")}
                >
                  Product Name {sortConfig.key === "Product.name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort("QuantityPurchased")}
                >
                  Quantity Purchased {sortConfig.key === "QuantityPurchased" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort("PurchaseDate")}
                >
                  Purchase Date {sortConfig.key === "PurchaseDate" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort("TotalPurchaseAmount")}
                >
                  Total Purchase Amount {sortConfig.key === "TotalPurchaseAmount" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentPurchases.map((element) => (
                <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {element.Product?.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.QuantityPurchased}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(element.PurchaseDate).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                      ? "Today"
                      : element.PurchaseDate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${element.TotalPurchaseAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-between items-center p-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={previousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {Math.ceil(filteredPurchases.length / itemsPerPage)}
            </span>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredPurchases.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseDetails;