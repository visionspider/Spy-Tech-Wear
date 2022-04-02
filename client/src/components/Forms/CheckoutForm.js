import styled from "styled-components";
import { useState, useEffect } from "react";
import { ShippingAddress } from "./ShippingAddress";
import { PaymentDetail } from "./PaymentDetail";
import { ConfirmationDetail } from "./ConfirmationDetail";

export const CheckoutForm = () => {
  // State to store country list Information
  const [countryList, setCountryList] = useState(null);
  // State to store states/provinces
  const [territoryList, setTerritoryList] = useState(null);
  // State to store user Information
  const [userInformation, setUserInformation] = useState({
    //Optimized Data structure to store user information START
    // ShippingAddress: {
    //   address: "",
    //   addressNumber: "",
    //   country: "",
    //   territory: "",
    // },

    // ClientDetail: {
    //   fullName: "",
    //   email: "",
    //   postalCode: "",
    //   phoneNumber: "",
    // },

    // PaymentDetail: {
    //   creditCard: "",
    //   creditCardName: "",
    //   cvv: "",
    //   expiration: { month: "", year: "" },
    // },
    //Optimized Data structure to store user information END
    // ===========Temp
    address: "",
    addressNumber: "",
    country: "",
    territory: "",
    fullName: "",
    email: "",
    postalCode: "",
    phoneNumber: "",

    //step 2
    creditCard: "",
    creditCardName: "",
    cvv: "",
    expirationMonth: "",
    expirationYear: "",
  });
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  //Form steps
  const [formStep, setFormStep] = useState(1);

  // Error message
  const [errorMessage, setErrorMessage] = useState({
    //Optimized Data structure to store user information START
    // Step 1
    // ShippingAddress: {
    //   address: "",
    //   addressNumber: "",
    //   country: "",
    //   territory: "",
    // },

    // ClientDetail: {
    //   fullName: "",
    //   email: "",
    //   postalCode: "",
    //   phoneNumber: "",
    // },

    // // Step 2
    // PaymentDetail: {
    //   creditCard: "",
    //   creditCardName: "",
    //   cvv: "",
    //   expiration: { month: "", year: "" },
    // },
    //Optimized Data structure to store user information END

    // ===========Temp
    address: "",
    addressNumber: "",
    country: "",
    territory: "",
    fullName: "",
    email: "",
    postalCode: "",
    phoneNumber: "",
    creditCard: "",
    creditCardName: "",
    cvv: "",
    expirationMonth: "",
    expirationYear: "",
  });

  // fetch country data from API
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/get-country-data")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((result) => {
        console.log("data retrieved is:", result);
        setCountryList(result.data[0].CountryList);
        setTerritoryList(result.data[0].Territories);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Update form input value field
  const handleOnChange = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;
    setUserInformation({ ...userInformation, [name]: value });
  };

  return (
    // If fetching is done
    isLoading === false ? (
      <Form
        // Removes autofill
        autoComplete="new-password"
        onSubmit={(ev) => {
          ev.preventDefault();
          console.log("Submitted");
          // If userHas entered valid information, proceed with submission
          // if (validUserInformation === true) {
          /*          fetch(`/api/update-reservation/`, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "PATCH",
                  body: JSON.stringify({
              isAvailable: false,
            }),
          }).then((res) => {
            if (res.ok) {
              return res.json();
            }
          }); */
          //     console.log("data sumbitted");
          //   }
        }}
      >
        {/* Form step indicator*/}
        <Section>
          <div>Step 1</div>
          <div>Step 2</div>
          <div>Step 3</div>
        </Section>

        {/* Shipping detail*/}
        {formStep === 1 && (
          <ShippingAddress
            // Error handling
            handleOnChange={handleOnChange}
            // Error message
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            // DropDown data
            countryList={countryList}
            territoryList={territoryList}
            // User input
            setUserInformation={setUserInformation}
            userInformation={userInformation}
            // Form step
            setFormStep={setFormStep}
            formStep={formStep}
          />
        )}
        {/* Payment Detail */}
        {formStep === 2 && (
          <PaymentDetail
            handleOnChange={handleOnChange}
            userInformation={userInformation}
            setUserInformation={setUserInformation}
            setFormStep={setFormStep}
            formStep={formStep}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        )}
        {/* Confirmation Detail */}
        {formStep === 3 && (
          <ConfirmationDetail
            handleOnChange={handleOnChange}
            userInformation={userInformation}
            setUserInformation={setUserInformation}
            setFormStep={setFormStep}
            formStep={formStep}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        )}
      </Form>
    ) : (
      // If fetching is not done -> Loading country information
      <div>Fetching data...</div>
    )
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white; //Can remove this later
  border: 5px solid black;
  min-height: 500px;
  width: 650px;
  font-weight: bold;
  margin: auto;
`;

const Tab = styled.div`
  color: inherit;
  font-size: 1em;
  background-color: #f0f0f0;
  height: 25px;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
