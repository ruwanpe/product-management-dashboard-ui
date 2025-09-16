"use client";

import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://localhost:7249/api/Product";

interface Product {
  id: number;
  category: string;
  name: string;
  productCode: string;
  price: number;
  sku: string;
  stockQuantity: number;
  dateAdded: string;
}

export default function ProductDetails() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchProducts = async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(BASE_URL, {
        signal: abortControllerRef.current?.signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = (await response.json()) as Product[];
      setProducts(data);
    } catch (e: any) {
      if (e.name === "AbortError") {
        console.log("Fetch aborted");
        return;
      }
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "red" }}>
        Error: {error.message || "Something went wrong! Please try again."}
      </div>
    );
  }

  return (
    <div>
      <h1>Product Details</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Product Code</th>
            <th>Price</th>
            <th>SKU</th>
            <th>Stock Quantity</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.productCode}</td>
              <td>{product.price}</td>
              <td>{product.sku}</td>
              <td>{product.stockQuantity}</td>
              <td>{product.dateAdded}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
