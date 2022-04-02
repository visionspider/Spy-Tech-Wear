import styled from "styled-components";
import { useState, useEffect } from "react";
import { moment } from "moment";

export const PaymentDetail = ({
  userInformation,
  handleOnChange,
  setFormStep,
  setUserInformation,
  formStep,
  errorMessage,
  setErrorMessage,
}) => {
  const [validUserInformation, setvalidUserInformation] = useState(false);

  // Form validation function
  useEffect(() => {
    // Optimal way to validate user information, Need to select current page fields tho
    // for (let userData in userInformation) {
    //   if (userInformation[userData] === "") {
    //     console.log("Invalid user", userInformation[userData]);
    //     setvalidUserInformation(false);
    //     return;
    //   } else {
    //     console.log("Valid user information");
    //     for (let errorData in errorMessage) {
    //       if (errorMessage[errorData] !== "") {
    //         console.log("Invalid error", errorMessage[errorData]);
    //         setvalidUserInformation(false);
    //         return;
    //       } else {
    //         setvalidUserInformation(true);
    //       }
    //     }
    //   }

    // Probably better way to do this
    if (
      // ============================================= Temp
      userInformation.creditCard !== "" &&
      userInformation.creditCardName !== "" &&
      userInformation.cvv !== "" &&
      userInformation.expirationMonth !== "" &&
      userInformation.expirationYear !== "" &&
      // Check if there are no error messages
      errorMessage.creditCard === "" &&
      errorMessage.creditCardName === "" &&
      errorMessage.cvv === "" &&
      errorMessage.expirationMonth === "" &&
      errorMessage.expirationYear === ""
    ) {
      setvalidUserInformation(true);
    } else {
      setvalidUserInformation(false);
    }
  }, [userInformation, errorMessage]);

  // Function to display form mistakes on blur
  const handleOnBlur = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;

    // ============== Card number edge cases ============== //
    if (name === "creditCard" && value === "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a card number",
      });
    } else if (name === "creditCard" && isNaN(value)) {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please only enter numbers",
      });
    } else if (name === "creditCard" && value.length < 16) {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a valid card number, it should have 16 digits",
      });
    } else if (name === "creditCard" && value.length === 16) {
      setErrorMessage({
        ...errorMessage,
        [name]: "",
      });
    }
    // ============== Card name edge cases ============== //
    if (name === "creditCardName" && value === "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a card name",
      });
    } else if (name === "creditCardName" && Number(value)) {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a valid card name, it should not be a number",
      });
    } else if (name === "creditCardName" && isNaN) {
      setErrorMessage({
        ...errorMessage,
        [name]: "",
      });
    }
    // ============== Expiration month edge cases ============== //
    if (name === "expirationMonth" && value === "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a month",
      });
    } else if (name === "expirationMonth" && value !== "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "",
      });
    }
    // ============== Expiration Year edge cases ============== //
    if (name === "expirationYear" && value === "") {
      setErrorMessage({ ...errorMessage, [name]: "Please enter a year" });
    } else if (name === "expirationYear" && isNaN(value)) {
      setErrorMessage({ ...errorMessage, [name]: "Please enter numbers only" });
    } else if (name === "expirationYear" && value.length !== 4) {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a valid year in this format: XXXX",
      });
    } else if (name === "expirationYear" && value.length === 4) {
      setErrorMessage({ ...errorMessage, [name]: "" });
    }

    // ============== CVV edge cases ============== //
    if (name === "cvv" && value === "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a CVV",
      });
    } else if (name === "cvv" && isNaN(value)) {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a valid CVV, it should only contain numbers",
      });
    } else if (name === "cvv" && (value.length < 3 || value.length > 4)) {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a valid CVV, it should have 3 or 4 digits",
      });
    } else if (name === "cvv" && (value.length === 3 || value.length === 4)) {
      setErrorMessage({
        ...errorMessage,
        [name]: "",
      });
    }
  };

  // Use moment instead of hardcoded date
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Container>
      <Title>Payment Details</Title>
      {/* Credit Card */}
      <InputContainer>
        <Label>Card number</Label>
        <Input
          value={userInformation.creditCard}
          name="creditCard"
          type="text"
          onBlur={(e) => handleOnBlur(e)}
          onChange={(ev) => handleOnChange(ev)}
          autoComplete="off"
          required
        />
        <ErrorMessage>{errorMessage.creditCard}</ErrorMessage>
      </InputContainer>
      {/* Credit Card name */}
      <InputContainer>
        <Label>Card Name</Label>
        <Input
          value={userInformation.creditCardName}
          name="creditCardName"
          type="text"
          onBlur={(e) => handleOnBlur(e)}
          onChange={(ev) => handleOnChange(ev)}
          autoComplete="off"
          required
        />
        <ErrorMessage>{errorMessage.creditCardName}</ErrorMessage>
      </InputContainer>

      {/* Flex container */}
      <Section>
        {/* Input Month */}
        <InputContainer style={{ width: "30%" }}>
          <Label>Expiration</Label>
          <Select
            value={userInformation.expirationMonth}
            name="expirationMonth"
            onChange={(e) => handleOnChange(e)}
            style={{ width: "70%" }}
            onBlur={(e) => handleOnBlur(e)}
            autoComplete="off"
            required
          >
            <option value="" selected disabled>
              Month
            </option>
            {/* Make each month an option */}
            {monthNames.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </Select>
          <ErrorMessage>{errorMessage.expirationMonth}</ErrorMessage>
        </InputContainer>
        {/* Input Year */}
        <InputContainer>
          <Label>Year</Label>
          <Input
            value={userInformation.expirationYear}
            name="expirationYear"
            onChange={(e) => handleOnChange(e)}
            style={{ width: "40%" }}
            onBlur={(e) => handleOnBlur(e)}
            autoComplete="off"
            type="text"
            required
          />
          <ErrorMessage>{errorMessage.expirationYear}</ErrorMessage>
        </InputContainer>
        {/* CCV */}
        <InputContainer>
          <Label>CVV</Label>
          <Input
            value={userInformation.cvv}
            name="cvv"
            type="text"
            onBlur={(e) => handleOnBlur(e)}
            onChange={(ev) => handleOnChange(ev)}
            autoComplete="off"
            style={{ width: "30%" }}
            required
          />
          <ErrorMessage>{errorMessage.cvv}</ErrorMessage>
        </InputContainer>
      </Section>
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
      {/* Button to go to next page */}
      <Button
        style={{
          cursor: `${validUserInformation === true ? "pointer" : "initial"}`,
          backgroundColor: `${
            validUserInformation === true ? "red" : "initial"
          }`,
        }}
        onClick={() => {
          if (validUserInformation === true) {
            setFormStep(formStep + 1);
          }
        }}
      >
        Next
      </Button>
    </Container>
  );
};

const Input = styled.input`
  width: 100%;
  font-size: 1em;
  font-weight: normal;
  border: 1px solid black;
`;

const InputContainer = styled.div``;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

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
const Select = styled.select`
  border: 1px solid black;
`;
