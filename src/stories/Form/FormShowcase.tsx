import { Form } from "@/components/Form/Form";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { addressSchema, membershipSchema } from "../schema";
import { JSONSchema7 } from "json-schema";
import axios from "axios";

const clearEmptyString = (object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([key, value]) => value !== "")
  );
};

const FormShowcase = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Form
        schema={addressSchema as JSONSchema7}
        ignore={["id", "created_at", "updated_at"]}
        onSubmit={async (data) => {
          console.log("gkpotsk", clearEmptyString(data));
          const options = {
            method: "POST",
            url: "http://localhost:8081/api/g/core_addresses",
            headers: {
              Apikey: "YOUR_SECRET_TOKEN",
              "Content-Type": "application/json",
            },
            data: clearEmptyString(data),
          };

          try {
            const { data } = await axios.request(options);
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }}
      />

      <Form
        schema={membershipSchema as JSONSchema7}
        ignore={["id", "created_at", "updated_at"]}
        onSubmit={async (data) => {
          const options = {
            method: "POST",
            url: "http://localhost:8081/api/g/core_memberships",
            headers: {
              Apikey: "YOUR_SECRET_TOKEN",
              "Content-Type": "application/json",
            },
            data: clearEmptyString(data),
          };

          try {
            const { data } = await axios.request(options);
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }}
      />
    </ChakraProvider>
  );
};

export default FormShowcase;
