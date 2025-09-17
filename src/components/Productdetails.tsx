"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fetchData } from "../Service/ProductService";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchData("All");
        setProducts(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
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
              <td>{format(new Date(product.dateAdded), "MM-dd-yyyy")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
