import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddPurchaseDetails({
  addSaleModalSetting,
  products,
  handlePageUpdate,
  authContext,
}) {
  const [purchase, setPurchase] = useState({
    userID: authContext.user,
    productID: "",
    quantityPurchased: "",
    purchaseDate: new Date().toISOString().split("T")[0], // Default to today's date
    totalPurchaseAmount: "",
  });
  const [error, setError] = useState(""); // Error message for quantity validation
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  // Handle input changes
  const handleInputChange = (key, value) => {
    console.log(`Input changed: ${key} = ${value}`); // Debugging line
  
    setPurchase((prev) => {
      const updatedPurchase = {
        ...prev,
        [key]: value,
      };
 
      console.log("products", products);

      const selectedProduct = products.find(
        (product) => product._id == (key == "productID" ? value : prev.productID)
      );

      console.log("Selected product:", selectedProduct);
      
      // Automatically calculate total purchase amount
      if (key === "quantityPurchased" || key === "productID") {
 // Debugging line
  
        if (selectedProduct) {
          const totalAmount =
            (key === "quantityPurchased" ? value : prev.quantityPurchased) *
            selectedProduct.price;
  
          updatedPurchase.totalPurchaseAmount = totalAmount || "";
  
          // Validate quantity
          if (
            key === "quantityPurchased" &&
            parseInt(value, 10) > selectedProduct.stock
          ) {
            setError(
              `Cannot purchase more than ${selectedProduct.stock} units of ${selectedProduct.name}.`
            );
          } else {
            setError(""); // Clear error if quantity is valid
          }
        }
      }
  
      console.log("Updated purchase state:", updatedPurchase); // Debugging line
      return updatedPurchase;
    });
  };

  // POST Data
  const addSale = () => {
    if (error) {
      alert("Please fix the errors before submitting.");
      return;
    }

    fetch("http://localhost:4000/api/purchase/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(purchase),
    })
      .then((result) => {
        alert("Purchase ADDED");
        handlePageUpdate();
        addSaleModalSetting();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg overflow-y-scroll">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg  py-4 font-semibold leading-6 text-gray-900 "
                      >
                        Order Details
                      </Dialog.Title>
                      <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
  <label
    htmlFor="productID"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    Product Name
  </label>
  <select
    id="productID"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    name="productID"
    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
  >
    <option value="">Select Products</option>
    {products.map((element) => (
      <option key={element._id} value={element._id}>
        {element.name}
      </option>
    ))}
  </select>
</div>

<div>
  <label
    htmlFor="quantityPurchased"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    Quantity Purchased
  </label>
  <input
    type="number"
    name="quantityPurchased"
    id="quantityPurchased"
    value={purchase.quantityPurchased}
    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    placeholder="0 - 999"
  />
  {error && (
    <p className="text-red-500 text-xs mt-1">
      {error}
    </p>
  )}
</div>
                          <div>
                            <label
                              htmlFor="totalPurchaseAmount"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Total Purchase Amount
                            </label>
                            <input
                              type="number"
                              name="totalPurchaseAmount"
                              id="price"
                              value={purchase.totalPurchaseAmount}
                              disabled
                              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="$299"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="purchaseDate"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Purchase Date
                            </label>
                            <input
                              type="date"
                              id="purchaseDate"
                              name="purchaseDate"
                              value={purchase.purchaseDate}
                              disabled
                              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-4"></div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto ${
                    error
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-500"
                  }`}
                  onClick={addSale}
                  disabled={!!error} // Disable the button if there is an error
                >
                  Add
                </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => addSaleModalSetting()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}