import { FileDropzone } from "@/components/Form/components/FileDropzone";
import { Form } from "@/components/Form/Form";
import { Provider } from "@/components/ui/provider";
import { Box, Flex, Grid } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/Form/File Drop",
  component: Form,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof meta>;

export default meta;

export const FileDrop: Story = {
  render: () => {
    return <MembershipForm />;
  },
};

const MembershipForm = () => {
  const [files, setFiles] = useState([]);
  return (
    <Provider>
      <Grid width={"50dvw"} height={"50dvh"}>
        <FileDropzone
          onDrop={({ files, text }) => {
            console.log(files, text, "jfdoesa");
            setFiles(files);
          }}
        />
      </Grid>
      <Flex flexFlow={"column"}>
        {files.map((file) => {
          return <Box>{file.name}</Box>;
        })}
      </Flex>
    </Provider>
  );
};
