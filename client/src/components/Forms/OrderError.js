import { Container, SubTitle, Title } from "./Components/FormStyles";

export const OrderError = ({ message }) => {
  return (
    <Container
      style={{
        height: "500px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title style={{ color: "red", borderBottom: "none" }}>
        There was an error with the order
      </Title>
      <SubTitle
        style={{ marginBottom: "5px", fontSize: "1.2em", borderBottom: "none" }}
      >
        {message}
      </SubTitle>
      <SubTitle
        style={{
          marginBottom: "5px",
          fontSize: "1.2em",
          borderBottom: "none",
          color: "red",
        }}
      >
        Please try again later
      </SubTitle>
    </Container>
  );
};
