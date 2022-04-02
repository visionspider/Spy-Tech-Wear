import styled from "styled-components";
import { useState, useEffect } from "react";

export const ConfirmationDetail = ({
  userInformation,
  handleOnChange,
  setFormStep,
  formStep,
}) => {
  return (
    <Container>
      <Title>Confirmation Detail</Title>
      {/* Shipping detail */}
      <div>
        <SubTitle style={{ fontSize: "1" }}>Shipping Detail</SubTitle>
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
        <SubTitle style={{ fontSize: "1" }}>Payment Detail</SubTitle>
        <div>
          credit card: xx{String(userInformation.creditCard).substr(-2)}
        </div>
        <div>credit card name: {userInformation.creditCardName}</div>
      </div>
      {/* Button to go to back a page */}
      <Button
        style={{
          cursor: "pointer",
          backgroundColor: "red",
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
          backgroundColor: "red",
        }}
        type="submit"
      >
        Confirm
      </Button>
    </Container>
  );
};

const InputContainer = styled.div``;

const Label = styled.div`
  font-size: 1em;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8em;
`;

const Title = styled.div`
  font-size: 1.5em;
`;

const Button = styled.button`
  width: 80%;
  border: 1px solid black;
  margin: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightcoral;
  gap: 10px;
`;

const SubTitle = styled.div`
  font-size: 1.2em;
`;
