import styled from "styled-components";
import { useState, useEffect } from "react";

export const ShippingAddress = ({
  userInformation,
  countryList,
  handleOnChange,
  territoryList,
  setFormStep,
  setUserInformation,
  formStep,
  errorMessage,
  setErrorMessage,
}) => {
  // State boolean for form next
  const [validUserInformation, setvalidUserInformation] = useState(false);

  //======Optimized Data structure to store user information START==========
  // const ShippingAddress = userInformation.ShippingAddress;
  // const ClientDetail = userInformation.ClientDetail;
  // const ShippingAddressErrorMessage = errorMessage.ShippingAddress;
  // const ClientDetailErrorMessage = errorMessage.ClientDetail;
  //========Optimized Data structure to store user information END========

  // stackoverflow
  const phoneRegex = /^[-+]?[0-9]+$/;
  // StackOverflow: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
      userInformation.country !== "" &&
      userInformation.address !== "" &&
      userInformation.postalCode !== "" &&
      userInformation.territory !== "" &&
      userInformation.addressNumber !== "" &&
      userInformation.fullName !== "" &&
      userInformation.email !== "" &&
      userInformation.phoneNumber !== "" &&
      // Check if there are no error messages
      errorMessage.phoneNumber === "" &&
      errorMessage.fullName === "" &&
      errorMessage.email === "" &&
      errorMessage.country === "" &&
      errorMessage.address === "" &&
      errorMessage.postalCode === "" &&
      errorMessage.territory === "" &&
      errorMessage.addressNumber === ""
    ) {
      setvalidUserInformation(true);
    } else setvalidUserInformation(false);
  }, [userInformation, errorMessage]);

  // Optimize code by linking to onChange
  // Function to display form mistakes on blur
  const handleOnBlur = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;
    // ============== Country edge cases ============== //
    if (name === "country" && value === "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please select a country",
      });
    } else if (name === "country" && value !== "") {
      setErrorMessage({ ...errorMessage, [name]: "" });
    }
    // ============== Full Name edge cases ============== //
    if (name === "fullName" && value === "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a name",
      });
    } else if (name === "fullName" && Number(value)) {
      setErrorMessage({
        ...errorMessage,
        [name]: "A name should not have any numbers!",
      });
    } else if (name === "fullName" && value !== "") {
      setErrorMessage({ ...errorMessage, [name]: "" });
    }
    // ============== Phone number edge cases ==============//
    if (name === "phoneNumber" && value === "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a phone number",
      });
    } else if (name === "phoneNumber" && isNaN(value)) {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter numbers only. Format is XXX-XXX-XXXX",
      });
    } else if (name === "phoneNumber" && value.length < 10) {
      setErrorMessage({
        ...errorMessage,
        [name]: "Input should be at least 10 numbers long",
      });
    } else if (name === "phoneNumber" && value.length > 15) {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a valid phone number",
      });
    } else if (name === "phoneNumber" && value.match(phoneRegex)) {
      console.log("regex match");
      setErrorMessage({ ...errorMessage, [name]: "" });
    }
    // ============== Address edge cases ============== //
    if (name === "address" && value === "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a valid address",
      });
    } else if (name === "address" && Number(value)) {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please do not include any numbers in street address",
      });
    } else if (name === "address" && value.length > 3) {
      setErrorMessage({
        ...errorMessage,
        [name]: "",
      });
    }
    // ============== Address number edge cases ============== //
    if (name === "addressNumber" && value === "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a valid address number",
      });
    } else if (name === "addressNumber" && isNaN(value)) {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter numbers only",
      });
    } else if (name === "addressNumber" && Number(value)) {
      setErrorMessage({
        ...errorMessage,
        [name]: "",
      });
    }
    // ============== Email edge cases ============== //
    if (name === "email" && value === "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter an email",
      });
    } else if (name === "email" && !emailRegex.test(value)) {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a valid email",
      });
    } else if (name === "email" && emailRegex.test(value)) {
      setErrorMessage({
        ...errorMessage,
        [name]: "",
      });
    }
    // ============== Territory edge cases ============== //
    if (name === "territory" && value === "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please select a province/territory",
      });
    } else if (name === "territory" && value !== "") {
      setErrorMessage({ ...errorMessage, [name]: "" });
    }
    // ============== Postal code edge cases ============== //
    if (name === "postalCode" && value === "") {
      setErrorMessage({
        ...errorMessage,
        [name]: "Please enter a postal code",
      });
    } else if (name === "postalCode" && value !== "") {
      setErrorMessage({ ...errorMessage, [name]: "" });
    }
  };

  return (
    <Container>
      <Title>Shipping Detail</Title>
      {/* Country Section */}
      <InputContainer>
        <Label>Country/Region</Label>
        <Select
          value={userInformation.country}
          name="country"
          onChange={(e) => handleOnChange(e)}
          style={{ width: "100%" }}
          onBlur={(e) => handleOnBlur(e)}
          autoComplete="on"
          required
        >
          <option value="" selected disabled>
            Country
          </option>
          {countryList?.map((country, i) => (
            <option key={i} value={country.name} category="ShippingAddress">
              {country.name}
            </option>
          ))}
        </Select>
        <ErrorMessage>{errorMessage.country}</ErrorMessage>
      </InputContainer>
      {/* Full name */}
      <InputContainer>
        <Label>Full name</Label>
        <Input
          value={userInformation.fullName}
          name="fullName"
          type="text"
          category="ShippingAddress"
          onBlur={(e) => handleOnBlur(e)}
          onChange={(ev) => handleOnChange(ev)}
          autoComplete="none"
          required
        />
        <ErrorMessage>{errorMessage.fullName}</ErrorMessage>
      </InputContainer>
      {/* Phone number */}
      <InputContainer>
        <Label>Phone number</Label>
        <Input
          value={userInformation.phoneNumber}
          name="phoneNumber"
          type="tel"
          pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
          placeholder="123-456-7890"
          onChange={(ev) => handleOnChange(ev)}
          onBlur={(ev) => handleOnBlur(ev)}
          autoComplete="none"
          required
        />
        <ErrorMessage>{errorMessage.phoneNumber}</ErrorMessage>
      </InputContainer>
      {/* Address street name */}
      <InputContainer>
        <Label>Address</Label>
        <Input
          value={userInformation.address}
          name="address"
          type="text"
          placeholder="Street address or P.O. box"
          onChange={(ev) => handleOnChange(ev)}
          onBlur={(ev) => handleOnBlur(ev)}
          autoComplete="none"
          required
        />
        {/* ADD SPACING */}
        <ErrorMessage>{errorMessage.address}</ErrorMessage>
        <div>.</div>
        {/* Address house number */}
        <Input
          value={userInformation.addressNumber}
          name="addressNumber"
          type="text"
          placeholder="Apt, Suite, Unit, Building"
          onChange={(ev) => handleOnChange(ev)}
          onBlur={(ev) => handleOnBlur(ev)}
          autoComplete="none"
          required
        />
        <ErrorMessage>{errorMessage.addressNumber}</ErrorMessage>
      </InputContainer>
      {/* Email address */}
      <InputContainer>
        <Label>Email</Label>
        <Input
          value={userInformation.email}
          name="email"
          type="email"
          onChange={(ev) => handleOnChange(ev)}
          onBlur={(ev) => handleOnBlur(ev)}
          autoComplete="none"
          required
        />
        <ErrorMessage>{errorMessage.email}</ErrorMessage>
      </InputContainer>
      {/* Selected neither USA || Canada*/}
      {userInformation?.country !== "Canada" &&
        userInformation?.country !== "United States" && (
          <>
            <InputContainer>
              <Label>Province/Territory</Label>
              <Input
                value={userInformation.territory}
                name="territory"
                type="text"
                onChange={(ev) => handleOnChange(ev)}
                onBlur={(ev) => handleOnBlur(ev)}
                autoComplete="none"
                required
              />
              <ErrorMessage>{errorMessage.territory}</ErrorMessage>
            </InputContainer>
            <InputContainer>
              <Label>Postal code</Label>
              <Input
                value={userInformation.postalCode}
                name="postalCode"
                type="text"
                onChange={(ev) => handleOnChange(ev)}
                style={{ width: "20%" }}
                onBlur={(ev) => handleOnBlur(ev)}
                autoComplete="none"
                required
              />
              <ErrorMessage>{errorMessage.postalCode}</ErrorMessage>
            </InputContainer>
          </>
        )}
      {/* Selected  Canada*/}
      {userInformation?.country === "Canada" && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <InputContainer>
            <Label>Province</Label>
            <Select
              value={userInformation.territory}
              name="territory"
              onChange={(e) => handleOnChange(e)}
              style={{ width: "100%" }}
              onBlur={(e) => handleOnBlur(e)}
              autoComplete="none"
              required
            >
              <option value="" selected disabled>
                Provinces
              </option>
              {/* List out all provinces */}
              {territoryList[1].states.map((provinces, i) => (
                <option key={i} value={provinces.name}>
                  {provinces.name}
                </option>
              ))}
            </Select>
            <ErrorMessage>{errorMessage.territory}</ErrorMessage>
          </InputContainer>
          {/* Postal Code*/}
          <InputContainer>
            <Label>Postal code</Label>
            <Input
              value={userInformation.postalCode}
              name="postalCode"
              type="text"
              onChange={(ev) => handleOnChange(ev)}
              style={{ width: "50%" }}
              onBlur={(ev) => handleOnBlur(ev)}
              autoComplete="none"
              required
            />
            <ErrorMessage>{errorMessage.postalCode}</ErrorMessage>
          </InputContainer>
        </div>
      )}
      {/* Selected  USA*/}
      {userInformation?.country === "United States" && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <InputContainer>
            <Label>States</Label>
            <Select
              value={userInformation.territory}
              name="territory"
              onChange={(e) => handleOnChange(e)}
              style={{ width: "40%" }}
              onBlur={(e) => handleOnBlur(e)}
              autoComplete="none"
              required
            >
              <option value="" selected disabled>
                States
              </option>
              {/* List out all provinces */}
              {territoryList[0].states.map((state, i) => (
                <option key={i} value={state.name}>
                  {state.name}
                </option>
              ))}
            </Select>
            <ErrorMessage>{errorMessage.territory}</ErrorMessage>
          </InputContainer>
          {/* Postal Code*/}
          <InputContainer>
            <Label>Postal code</Label>
            <Input
              value={userInformation.postalCode}
              name="postalCode"
              type="text"
              onblur={(ev) => handleOnBlur(ev)}
              onChange={(ev) => handleOnChange(ev)}
              style={{ width: "50%" }}
              autoComplete="none"
              required
            />
            <ErrorMessage>{errorMessage.postalCode}</ErrorMessage>
          </InputContainer>
        </div>
      )}
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

const Label = styled.div`
  font-size: 1em;
`;

const Select = styled.select`
  border: 1px solid black;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8em;
`;

const Button = styled.button`
  width: 80%;
  border: 1px solid black;
  margin: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
`;
const Title = styled.div`
  font-size: 1.5em;
`;
