import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, SubTitle, Title } from "./Components/FormStyles";

export const OrderConfirmed = ({
  userInformation,
  itemsInsideCart,
  setShoppingCart,
}) => {
  const [cartCopy, setShoppingCartCopy] = useState(itemsInsideCart);

  useEffect(() => {
    setShoppingCart([]);
  }, []);

  return (
    <Container
      style={{
        height: "500px",
      }}
    >
      <Title
        style={{
          color: "green",
          borderBottom: "none",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Order Placed successfully!
      </Title>
      <SubTitle
        style={{
          marginBottom: "50px",
          borderBottom: "none",
          textAlign: "center",
        }}
      >
        Thank you {userInformation.fullName} for shopping with us!
      </SubTitle>

      {/* Order detail */}
      <div>
        <SubTitle style={{ borderBottom: "none" }}>Order Details</SubTitle>

        <Table>
          <TableMainColumn style={{ flex: "1" }}>
            Product Name
            {cartCopy.map((item, i) => (
              <TableElement key={i}>{`${item.name.split(" ")[0]} ${
                item.name.split(" ")[1]
              }...`}</TableElement>
            ))}
          </TableMainColumn>
          <TableSecondaryColumn>
            Price
            {cartCopy.map((item, i) => (
              <TableElement key={i}>${item.price}</TableElement>
            ))}
          </TableSecondaryColumn>
          <TableSecondaryColumn>
            Qty
            {cartCopy.map((item, i) => (
              <TableElement key={i}>x{item.quantity}</TableElement>
            ))}
          </TableSecondaryColumn>
          <TableSecondaryColumn>
            Subtotal
            {cartCopy.map((item, i) => (
              <TableElement key={i}>${item.price * item.quantity}</TableElement>
            ))}
            <TableElement style={{ fontSize: "1.1em" }}>
              Total: ${" "}
              {(
                Math.round(
                  cartCopy.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  ) * 100
                ) / 100
              ).toFixed(2)}
            </TableElement>
          </TableSecondaryColumn>
        </Table>
      </div>
    </Container>
  );
};

const Table = styled.div`
  display: flex;
  font-weight: bold;
`;

const TableMainColumn = styled.div`
  flex: 1;
  font-size: 1.1em;
`;
const TableSecondaryColumn = styled.div`
  flex: 0.5;
  text-align: right;
  font-size: 1.1em;
`;

const TableElement = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  border-top: 1px solid black;
  font-size: 0.95em;
`;
