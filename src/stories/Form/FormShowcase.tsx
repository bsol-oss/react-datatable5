import { Form } from "@/components/Form/Form";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { addressSchema } from "../schema";

const FormShowcase = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Form
        schema={addressSchema}
        ignore={["id", "created_at", "updated_at"]}
      />
    </ChakraProvider>
  );
};

export default FormShowcase;
