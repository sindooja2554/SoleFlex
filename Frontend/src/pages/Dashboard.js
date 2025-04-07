import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [saleAmount, setSaleAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPurchases, setTotalPurchases] = useState([]); // State to store all purchases
  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [
      {
        label: "# of Products",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "Monthly Sales Amount",
        data: Array(12).fill(0), // Initialize with 12 zeros
      },
    ],
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchTotalSaleAmount();
    fetchTotalPurchaseAmount();
    fetchStoresData();
    fetchProductsData();
    fetchAllPurchases(); // Fetch all purchases when the component mounts
  }, []);

// Fetch all purchases
const fetchAllPurchases = () => {
  fetch("http://localhost:4000/api/purchase/get")
    .then((response) => response.json())
    .then((data) => {
      console.log("All Purchases: ", data); // Log the fetched purchases
      setTotalPurchases(data); // Save the fetched data in totalPurchases
      calculateMonthlySales(data); // Calculate monthly sales based on fetched data
    })
    .catch((err) => console.log(err));
};

// Calculate Monthly Sales Amount
const calculateMonthlySales = (purchases) => {
  const monthlySales = Array(12).fill(0); // Initialize an array with 12 zeros

  purchases.forEach((purchase) => {
    const monthIndex = new Date(purchase.PurchaseDate).getMonth(); // Get the month index (0-11)
    monthlySales[monthIndex] += purchase.TotalPurchaseAmount; // Add the total purchase amount to the respective month
  });

  // Update the chart data
  setChart((prevChart) => ({
    ...prevChart,
    series: [
      {
        name: "Monthly Sales Amount",
        data: monthlySales,
      },
    ],
  }));

  // Update the current month's sales
  const currentMonthIndex = new Date().getMonth();
  setSaleAmount(monthlySales[currentMonthIndex]);
};

  const fetchTotalSaleAmount = () => {
    fetch(
      `http://localhost:4000/api/sales/get/${authContext.user}/totalsaleamount`
    )
      .then((response) => response.json())
      .then((datas) => setSaleAmount(datas.totalSaleAmount));
  };

  // Fetching total purchase amount
  const fetchTotalPurchaseAmount = () => {
    fetch(
      `http://localhost:4000/api/purchase/get/${authContext.user}/totalpurchaseamount`
    )
      .then((response) => response.json())
      .then((datas) => setPurchaseAmount(datas.totalPurchaseAmount));
  };

  // Fetching all stores data
  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => setStores(datas));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => {
        setProducts(datas);
        updateDoughnutChart(datas); // Update Doughnut chart with product data
      })
      .catch((err) => console.log(err));
  };

  // Update Doughnut Chart Data
  const updateDoughnutChart = (products) => {
    const categoryCounts = {};
    const colors = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ];
    const borderColors = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ];

    // Count products by category
    products.forEach((product) => {
      categoryCounts[product.category] =
        (categoryCounts[product.category] || 0) + 1;
    });

    const labels = Object.keys(categoryCounts);
    const data = Object.values(categoryCounts);

    setDoughnutData({
      labels: labels,
      datasets: [
        {
          label: "# of Products",
          data: data,
          backgroundColor: colors.slice(0, labels.length),
          borderColor: borderColors.slice(0, labels.length),
          borderWidth: 1,
        },
      ],
    });
  };
console.log("Total Purchases: ", totalPurchases);

  return (
    <>
      <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4  p-4 ">
      <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
  <div
    className={`inline-flex gap-2 self-end rounded p-1 ${
      saleAmount >= chart.series[0].data[new Date().getMonth() - 1]
        ? "bg-green-100 text-green-600"
        : "bg-red-100 text-red-600"
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={
          saleAmount >= chart.series[0].data[new Date().getMonth() - 1]
            ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" // Upward arrow
            : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" // Downward arrow
        }
      />
    </svg>

    <span className="text-xs font-medium">
      {Math.abs(
        saleAmount >= chart.series[0].data[new Date().getMonth() - 1]
          ? ((saleAmount -
              chart.series[0].data[new Date().getMonth() - 1]) /
              chart.series[0].data[new Date().getMonth() - 1]) *
            100
          : ((chart.series[0].data[new Date().getMonth() - 1] - saleAmount) /
              chart.series[0].data[new Date().getMonth() - 1]) *
            100
      ).toFixed(2)}
      %
    </span>
  </div>

  <div>
    <strong className="block text-sm font-medium text-gray-500">Sales</strong>
    <p>
      <span className="text-2xl font-medium text-gray-900">${chart.series[0].data[new Date().getMonth()]}</span>
    </p>
  </div>
</article>

<article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
  <div
    className={`inline-flex gap-2 self-end rounded p-1 ${
      chart.series[0].data[new Date().getMonth() - 1] - saleAmount >= 0
        ? "bg-red-100 text-red-600"
        : "bg-green-100 text-green-600"
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={
          chart.series[0].data[new Date().getMonth() - 1] - saleAmount >= 0
            ? "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" // Downward arrow
            : "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" // Upward arrow
        }
      />
    </svg>

    <span className="text-xs font-medium">
      {Math.abs(
        ((saleAmount -
          chart.series[0].data[new Date().getMonth() - 1]) /
          chart.series[0].data[new Date().getMonth()]) *
        100
      ).toFixed(2)}
      %
    </span>
  </div>

  <div>
    <strong className="block text-sm font-medium text-gray-500">
      Profit/Loss
    </strong>
    <p>
      <span className="text-2xl font-medium text-gray-900">
        ${Math.abs(saleAmount - chart.series[0].data[new Date().getMonth() - 1])}
      </span>
    </p>
  </div>
</article>
        <div className="flex justify-around bg-white rounded-lg py-8 col-span-full justify-center">
          <div>
            <Chart
              options={chart.options}
              series={chart.series}
              type="bar"
              width="500"
            />
          </div>
          <div>
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
