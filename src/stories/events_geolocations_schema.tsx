import {
  LoadInitialValuesParams,
  LoadInitialValuesResult,
} from '@/components/Form/components/types/CustomJSONSchema7';
import { CustomQueryFnParams } from '@/components/Form/components/fields/StringInputField';

// Mock query functions for example schema (prefixed with underscore as they are example templates)
export const mockEventQueryFn = async ({
  limit,
  offset,
  where,
}: CustomQueryFnParams) => {
  const mockData = [
    { id: 'evt-1', name: 'Event 1' },
    { id: 'evt-2', name: 'Event 2' },
  ];
  let filtered = mockData;
  if (where && where.length > 0) {
    const ids = Array.isArray(where[0].value)
      ? where[0].value
      : [where[0].value];
    filtered = mockData.filter((item) => ids.includes(item.id));
  }
  const paginated = filtered.slice(offset, offset + limit);
  const idMap: Record<string, any> = {};
  paginated.forEach((item) => {
    idMap[item.id] = item;
  });
  return {
    data: { data: paginated, count: filtered.length },
    idMap,
  };
};

export const mockGeolocationQueryFn = async ({
  limit,
  offset,
  where,
}: CustomQueryFnParams) => {
  const mockData = [
    { id: 'geo-1', name: 'Geolocation 1' },
    { id: 'geo-2', name: 'Geolocation 2' },
  ];
  let filtered = mockData;
  if (where && where.length > 0) {
    const ids = Array.isArray(where[0].value)
      ? where[0].value
      : [where[0].value];
    filtered = mockData.filter((item) => ids.includes(item.id));
  }
  const paginated = filtered.slice(offset, offset + limit);
  const idMap: Record<string, any> = {};
  paginated.forEach((item) => {
    idMap[item.id] = item;
  });
  return {
    data: { data: paginated, count: filtered.length },
    idMap,
  };
};

// Helper function to create default loadInitialValues for id-picker fields
const createDefaultLoadInitialValues = () => {
  return async (
    params: LoadInitialValuesParams
  ): Promise<LoadInitialValuesResult> => {
    if (!params.ids || params.ids.length === 0) {
      return { data: { data: [], count: 0 }, idMap: {} };
    }

    const { customQueryFn, idColumn } = params;

    if (!customQueryFn) {
      throw new Error('customQueryFn is required. serverUrl has been removed.');
    }

    const { data, idMap: returnedIdMap } = await customQueryFn({
      searching: '',
      limit: params.ids.length,
      offset: 0,
      where: [
        {
          id: idColumn,
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
