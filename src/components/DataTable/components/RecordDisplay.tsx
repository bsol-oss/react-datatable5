import { snakeToLabel } from "@/components/Form/utils/snakeToLabel";
import { Box, BoxProps, Grid, Text } from "@chakra-ui/react";

export interface RecordDisplayProps {
  object: object | null;
  boxProps?: BoxProps;
}

export const RecordDisplay = ({ object, boxProps }: RecordDisplayProps) => {
  console.log(object, "dkfos");
  if (object === null) {
    return <>null</>;
  }
  return (
    <Grid rowGap={1} padding={1} overflow={"auto"} {...boxProps}>
      {Object.entries(object).map(([field, value]) => {
        return (
          <Grid key={field} columnGap={2} gridTemplateColumns={"auto 1fr"}>
            <Text color={"gray.400"}>{snakeToLabel(field)}</Text>
            {typeof value === "object" ? (
              <RecordDisplay object={value} />
            ) : (
              <Text>{JSON.stringify(value)}</Text>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};
