/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Paginator from "../../components/Paginator";

import Wrapper from "../../components/Wrapper";
import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`orders?page=${page}`);
      setOrders(data.data);

      setLastPage(data.meta.last_page);
    })();
    return () => {};
  }, [page]);

  return (
    <Wrapper>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => {
              return (
                <>
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.total}</td>
                    <td>
                      <a href="#" className="btn btn-sm btn-info">
                        View
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={5}>
                      <div>
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Product Title</th>
                              <th>Quantity</th>
                              <th>Price</th>
                            </tr>
                          </thead>

                          <tbody>
                            {order.order_items.map((orderItem: OrderItem) => {
                              return (
                                <tr key={orderItem.id}>
                                  <td>{orderItem.id}</td>
                                  <td>{orderItem.productTitle}</td>
                                  <td>{orderItem.quantity}</td>
                                  <td>{orderItem.price}</td>
                                  <td></td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </Wrapper>
  );
};

export default Orders;
