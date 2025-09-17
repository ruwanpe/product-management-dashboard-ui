"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import { useEffect, useState } from "react";
import { fetchData } from "../Service/ProductService";

interface ProductsByCategory {
  CategoryName: string;
  TotalQuantity: number;
}

export default function TotalStockCategory() {
  const [productsByCategory, setProductsByCategory] = useState<
    ProductsByCategory[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchData("AllByCategory");
        setProductsByCategory(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(typeof err === "string" ? err : "Unknown error"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-3">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-danger text-center mt-3">
        Error: {error.message || "Something went wrong! Please try again."}
      </div>
    );
  }

  return (
    <div className="shadow rounded p-4 bg-white">
      <h3 className="mb-4" style={{ color: "#1a237e" }}>
        Total stock quantity per category
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={productsByCategory}
          margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="CategoryName"
            angle={-30}
            textAnchor="end"
            interval={0}
            height={60}
          >
            <Label value="Category" offset={-40} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label
              value="Total quantity"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip
            contentStyle={{
              backgroundColor: "#f5f6fa",
              borderRadius: 8,
              border: "none",
            }}
            labelStyle={{ color: "#1a237e", fontWeight: 500 }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar
            dataKey="TotalQuantity"
            name="Total quantity"
            fill="#4169E1"
            radius={[6, 6, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
