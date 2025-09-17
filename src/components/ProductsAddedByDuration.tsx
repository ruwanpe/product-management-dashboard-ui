"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { useEffect, useState } from "react";
import { fetchData } from "../Service/ProductService";

interface ProductsByDuration {
  Duration: string;
  ProductsAdded: number;
}

export default function ProductsAddedByDuration() {
  const [productsAddedByDuration, setProductsAddedByDuration] = useState<
    ProductsByDuration[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getProductsAddedByDuration = async () => {
      try {
        const data = await fetchData("AllByDurationAdded");
        setProductsAddedByDuration(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      }
    };

    getProductsAddedByDuration().finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="text-center mt-3">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-3" style={{ color: "red" }}>
        Error: {error.message || "Something went wrong! Please try again."}
      </div>
    );
  }

  return (
    <div className="shadow rounded p-4 bg-white">
      <h3 className="mb-4" style={{ color: "#1a237e" }}>
        Products added over time
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={productsAddedByDuration}
          margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="Duration"
            angle={-30}
            textAnchor="end"
            interval={0}
            height={60}
          >
            <Label value="Duration" offset={-40} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label
              value="Products added"
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
            dataKey="ProductsAdded"
            name="Products added"
            fill="#4169E1"
            radius={[6, 6, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
