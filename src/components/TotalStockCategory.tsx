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
import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://localhost:7249/api/Product/GetAllProductsByCategory";

interface ProductsByCategory {
  CategoryName: string;
  TotalQuantity: number;
}

export default function GetAllProductsByCategory() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [productCategories, setProductcategories] = useState<
    ProductsByCategory[]
  >([]);
  const [page, setPage] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await fetch(BASE_URL, {
          signal: abortControllerRef.current?.signal,
        });
        const productCategories =
          (await response.json()) as ProductsByCategory[];
        setProductcategories(productCategories);
        console.log(productCategories);
      } catch (e: any) {
        if (e.name === "AbortError") {
          console.log("Aborted");
          return;
        }

        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  return (
    <div className="shadow rounded p-4 bg-white">
      <h3 className="mb-4" style={{ color: "#1a237e" }}>
        Total stock quantity per category
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={productCategories}
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
      {isLoading && <div className="text-center mt-3">Loading...</div>}
    </div>
  );
}
