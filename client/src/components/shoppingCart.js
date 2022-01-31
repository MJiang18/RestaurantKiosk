import React from "react";
import { Table } from "react-bootstrap";

const ShoppingCart = (props) => {
  const { userid } = props;

  return (
    <Table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
    </Table>
  );
};

export default ShoppingCart;
