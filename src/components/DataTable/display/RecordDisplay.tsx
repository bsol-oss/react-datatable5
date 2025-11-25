import { snakeToLabel } from '@/components/Form/utils/snakeToLabel';
import { BoxProps, Grid, Text } from '@chakra-ui/react';
import { UseTranslationResponse } from 'react-i18next';

export interface RecordDisplayProps {
  object: object | null;
  boxProps?: BoxProps;
  translate?: UseTranslationResponse<any, any>;
  prefix?: string;
}

export const RecordDisplay = ({
  object,
  boxProps,
  translate,
  prefix = '',
}: RecordDisplayProps) => {
  const getColumn = ({ field }: { field: string }) => {
    if (translate !== undefined) {
      return translate.t(`${prefix}${field}`);
    }
    return snakeToLabel(field);
  };
  if (object === null) {
    return <>null</>;
  }
  return (
    <Grid rowGap={1} padding={1} overflow={'auto'} {...boxProps}>
      {Object.entries(object).map(([field, value], index) => {
        const uniqueKey = `${prefix}${field}-${index}`;
        return (
          <Grid key={uniqueKey} columnGap={2} gridTemplateColumns={'auto 1fr'}>
            <Text color={'colorPalette.400'}>{getColumn({ field })}</Text>
            {typeof value === 'object' && value !== null ? (
              <RecordDisplay
                object={value}
                prefix={`${prefix}${field}.`}
                translate={translate}
              />
            ) : (
              <Text>{JSON.stringify(value)}</Text>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};
