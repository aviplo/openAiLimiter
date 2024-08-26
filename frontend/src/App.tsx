import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Configuration from "./components/Configuration";
import axios, { AxiosError } from "axios";
import "./components/loader.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";

export type Balance = {
  _id: string;
  name: string;
  tokens: number;
  limit: number;
  currentPrice: number;
  percentage: number;
};
function App() {
  const [data, setData] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/balance");
      setData(response.data);
      toast.success(response?.data || "Data fetched successfully", {
        className: "toast-message",
      });
    } catch (err) {
      const tempError = err as AxiosError;
      setError(tempError);
      toast.error(error?.message || "Error in fetching data", {
        className: "toast-message",
      });
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData().catch((err: unknown) => {
      console.error("Fetch error:", err);
      toast.error("An unexpected error occurred");
    });
  }, [fetchData]);

  if (loading) {
    return <div className="loader"></div>;
  }
  return (
    <>
      {data?.limit ? (
        <Dashboard data={data} onRefresh={fetchData} />
      ) : (
        <Configuration handleSendMessage={fetchData} />
      )}
    </>
  );
}

export default App;
