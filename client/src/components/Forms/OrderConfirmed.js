import { Container, SubTitle, Title } from "./Components/FormStyles";

export const OrderConfirmed = ({ userInformation, itemsInsideCart }) => {
  return (
    <Container
      style={{
        height: "500px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title style={{ color: "green", borderBottom: "none" }}>
        Order Placed successfully!
      </Title>
      <SubTitle style={{ marginBottom: "50px", borderBottom: "none" }}>
        Thank you {userInformation.fullName} for shopping with us!
      </SubTitle>

      {/* Order detail */}
      <div>
        <SubTitle style={{ borderBottom: "none" }}>Order Details</SubTitle>
        {itemsInsideCart.map((item, i) => (
          <div key={i}>
            {item.name} x {item.quantity} - ${item.price * item.quantity}
          </div>
        ))}
      </div>
      <SubTitle style={{ borderBottom: "none" }}>
        Total: $
        {itemsInsideCart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </SubTitle>
    </Container>
  );
};
