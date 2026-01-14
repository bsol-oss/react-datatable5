import {
  LoadInitialValuesParams,
  LoadInitialValuesResult,
} from '@/components/Form/components/types/CustomJSONSchema7';

// Helper function to create default loadInitialValues for id-picker fields
const createDefaultLoadInitialValues = () => {
  return async (
    params: LoadInitialValuesParams
  ): Promise<LoadInitialValuesResult> => {
    if (!params.ids || params.ids.length === 0) {
      return { data: { data: [], count: 0 }, idMap: {} };
    }

    const { column: column_ref, customQueryFn } = params.foreign_key;

    if (!customQueryFn) {
      throw new Error(
        'customQueryFn is required in foreign_key. serverUrl has been removed.'
      );
    }

    const { data, idMap: returnedIdMap } = await customQueryFn({
      searching: '',
      limit: params.ids.length,
      offset: 0,
      where: [
        {
          id: column_ref,
          value: params.ids.length === 1 ? params.ids[0] : params.ids,
        },
      ],
    });

    if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
      params.setIdMap((state) => {
        return { ...state, ...returnedIdMap };
      });
    }

    return { data, idMap: returnedIdMap || {} };
  };
};

export const eventGeolocationsSchema = {
  $id: 'http://api.localhost.com/schema/public/events_geolocations.json',
  type: 'object',
  title: 'events_geolocations',
  $schema: 'http://json-schema.org/draft-07/schema#',
  example: {
    event_id: '4f256c4c-0620-2390-63bf-3c3dead0d0bf',
    geolocation_id: 'e593cb5c-9000-cf9e-b8ad-f9c390992f14',
  },
  required: ['geolocation_id', 'event_id'],
  properties: {
    event_id: {
      type: 'string',
      format: 'uuid',
      description:
        'Missing description. Database type: uuid. Default value: null',
      variant: 'id-picker',
      column_ref: 'id',
      loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
    },
    extra_info: {
      type: 'object',
      properties: {},
      description:
        'Missing description. Database type: jsonb. Default value: null',
    },
    geolocation_id: {
      type: 'array',
      format: 'uuid',
      description:
        'Missing description. Database type: uuid. Default value: null',
      variant: 'id-picker',
      column_ref: 'id',
      loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
    },
  },
  description: 'Missing description',
  additionalProperties: false,
};
