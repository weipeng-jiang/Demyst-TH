import { useState, useEffect } from "react";
import { BalanceSheet } from "./BalanceSheet";
import { BalanceSheetData } from "./types";

// In actual app, this will come from an environment variable
const URI = "http://localhost:8080/api/reports/balance-sheet";

export const BalanceSheetContainer = () => {
  const [balanceSheetData, setBalanceSheetData] = useState<BalanceSheetData>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      try {
        const response = await fetch(URI);
        const data = await response.json();

        setBalanceSheetData(data);
      } catch (err) {
        setError("Failed to fetch balance sheet.");
        console.error(err);
      }
    };

    fetchBalanceSheet();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!balanceSheetData) {
    return <div className="loading">Loading...</div>;
  }

  return <BalanceSheet data={balanceSheetData} />;
};
