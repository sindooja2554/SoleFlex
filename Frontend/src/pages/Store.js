import React, { useState, useContext, useEffect } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [aiResponse, setAiResponse] = useState({
    topSellers: "",
    discontinue: "",
    restock: "",
  });
  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchSalesDataAndGetInsights();
  }, []);

  // Fetch sales data and send it to the AI API
  const fetchSalesDataAndGetInsights = async () => {
    try {
      // Fetch sales data from your backend
      const salesDataResponse = await fetch(
        `http://localhost:4000/api/sales/get/${authContext.user}`
      );
      // const salesData = await salesDataResponse.json();
      const salesData = {"_id":{"$oid":"67ea06b0665b1610d3c26c75"},"userID":{"$oid":"67e9fdb598a6cbff8e3a4298"},"ProductID":{"$oid":"67e9eddc98a6cbff8e3a3f55"},"StoreID":{"$oid":"67ea0696665b1610d3c26c6d"},"StockSold":{"$numberInt":"10"},"SaleDate":"2025-03-31","TotalSaleAmount":{"$numberInt":"1997"},"createdAt":{"$date":{"$numberLong":"1743390384608"}},"updatedAt":{"$date":{"$numberLong":"1743390384608"}},"__v":{"$numberInt":"0"}}
      const productsData = {"_id":{"$oid":"67e9ebb798a6cbff8e3a3f1a"},"userID":{"$oid":"67e9fdb598a6cbff8e3a4298"},"name":"Nike Air Force","manufacturer":"Sneaker","stock":{"$numberInt":"25"},"description":"87.89","createdAt":{"$date":{"$numberLong":"1743383479662"}},"updatedAt":{"$date":{"$numberLong":"1743392324957"}},"__v":{"$numberInt":"0"}}
      // Prepare the prompt for the AI API
      const prompt = `
Based on the following product and sales data, as well as current trends in the footwear industry and seasonal weather conditions, provide insights in the following exact format:

Top Sellers: <comma-separated list of product names with a short reason>
Discontinue: <comma-separated list of product names with a short reason>
Restock: <comma-separated list of product names with a short reason>

Products Data: ${JSON.stringify(productsData)}
Sales Data: ${JSON.stringify(salesData)}
`;


      // Send the prompt to the AI API (e.g., OpenAI's ChatGPT API)
      const aiApiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_API_KEY`, // Replace with your OpenAI API key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Updated model
          messages: [
            { role: "system", content: "You are an AI assistant providing insights based on sales data." },
            { role: "user", content: prompt }
          ],
          max_tokens: 500,
        }),
      });

      const aiApiData = await aiApiResponse.json();
      // const aiText = aiApiData.choices[0].text;
      const aiText = `
      Top Sellers: Nike Air Force – steady sales and moderate stock suggest continued demand, worth reordering in higher quantities.
Discontinue: No products to discontinue – limited data shows active sales and manageable stock.
Restock: Nike Air Force – aligns with current spring trends and lifestyle sneaker demand; restocking ensures availability.
    `;

      // Parse the AI response into structured insights
      const insights = parseAiResponse(aiText);
      setAiResponse(insights);
    } catch (error) {
      console.error("Error fetching sales data or AI insights:", error);
    }
  };

  // Parse the AI response into structured insights
  const parseAiResponse = (aiText) => {
    // Example parsing logic (you can customize this based on the AI response format)
    const lines = aiText.split("\n").filter((line) => line.trim() !== "");
    return {
      topSellers: lines[0] || "No insights available.",
      discontinue: lines[1] || "No insights available.",
      restock: lines[2] || "No insights available.",
    };
  };

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center p-5 w-full">
      <div className="flex flex-col gap-5 w-full border-2 p-5">
        <div className="flex justify-between">
          <span className="font-bold text-lg">Store Insights</span>
        </div>
        {showModal && <AddStore />}
        <div className="bg-white p-4 border rounded shadow-md w-full">
          <p className="font-semibold text-blue-600">{aiResponse.topSellers}</p>
          <p className="text-red-500">{aiResponse.discontinue}</p>
          <p className="text-green-600">{aiResponse.restock}</p>
        </div>
      </div>
    </div>
  );
}

export default Store;
