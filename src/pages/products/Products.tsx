/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Wrapper from "../../components/Wrapper";
import { Product } from "../../models/Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`products?page=${page}`);
      setProducts(data.data);

      setLastPage(data.meta.last_page);
    })();
    return () => {};
  }, [page]);

  const del = async (id: number) => {
    if (window.confirm("Are sure you want to delete this record?")) {
      await axios.delete(`products/${id}`);
      setProducts(products.filter((p: Product) => p.id !== id));
    }
  };

  const next = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Wrapper>
      {/* <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/products/create" className="btn btn-sm btn-primary">
          Add
        </Link>
      </div> */}

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img src={product.image} alt="" width="50" />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>$ {product.price}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`products/${product.id}/edit`}
                        className="btn btn-sm btn-success"
                      >
                        Edit
                      </Link>
                      <a
                        href="#"
                        className="btn btn-sm btn-danger"
                        onClick={() => del(product.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" onClick={prev}>
              Previous
            </a>
          </li>

          <li className="page-item">
            <a className="page-link" href="#" onClick={next}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

export default Products;
