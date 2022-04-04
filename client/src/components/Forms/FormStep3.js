import { Button, Container, SubTitle, Title } from "./Components/FormStyles";

export const ConfirmationDetail = ({
  userInformation,
  setFormStep,
  formStep,
  itemsInsideCart,
}) => {
  return (
    <Container>
      <Title>Please review your information</Title>
      {/* Shipping detail */}
      <div>
        <SubTitle>Shipping Detail</SubTitle>
        <div>Name: {userInformation.fullName}</div>
        <div>
          Address:{" "}
          {`${userInformation.address} ${userInformation.addressNumber}`}
        </div>
        <div>Phone: {userInformation.phoneNumber}</div>
        <div>Postal code: {userInformation.postalCode}</div>
        <div>Email: {userInformation.email}</div>
        <div>Country: {userInformation.country}</div>
        <div>State/Province: {userInformation.territory}</div>
      </div>
      {/* Payment detail */}
      <div>
        <SubTitle>Payment Detail</SubTitle>
        <div>
          Credit card: xx{String(userInformation.creditCard).substr(-2)}
        </div>
        <div>Credit card name: {userInformation.creditCardName}</div>
      </div>
      {/* Order detail */}
      <div>
        <SubTitle>Order</SubTitle>
        {itemsInsideCart.map((item, i) => (
          <div key={i}>
            {item.name} x {item.quantity} - ${item.price * item.quantity}
          </div>
        ))}
        <SubTitle>
          Total: $
          {itemsInsideCart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </SubTitle>
      </div>
      {/* Button to go to back a page */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <Button
          style={{
            cursor: "pointer",
            backgroundColor: "hsl(204, 8%, 76%)",
          }}
          onClick={() => {
            setFormStep(formStep - 1);
          }}
        >
          Back
        </Button>
        {/* Button to submit */}
        <Button
          style={{
            cursor: "pointer",
            backgroundColor: "rgb(4,170,109)",
            color: "white",
          }}
          type="submit"
        >
          Confirm
        </Button>
      </div>
    </Container>
  );
};
