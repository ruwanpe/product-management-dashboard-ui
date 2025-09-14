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

export default function GetAllProducts() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
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
        const products = (await response.json()) as Product[];
        setProducts(products);
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
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          <h1>Product details</h1>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Product Code</th>
                <th>Price</th>
                <th>SKU</th>
                <th>Stock Quantity</th>
                <th>Date Added</th>
              </tr>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.productCode}</td>
                    <td>{product.price}</td>
                    <td>{product.sku}</td>
                    <td>{product.stockQuantity}</td>
                    <td>{product.dateAdded}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
