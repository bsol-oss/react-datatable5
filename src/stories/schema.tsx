import { CustomQueryFnParams } from '@/components/Form/components/types/CustomJSONSchema7';
import {
  LoadInitialValuesParams,
  LoadInitialValuesResult,
} from '@/components/Form/components/types/CustomJSONSchema7';
import axios from 'axios';
import { CustomJSONSchema7 } from '@/components/Form/components/types/CustomJSONSchema7';

// Helper function to create default loadInitialValues for id-picker fields
const createDefaultLoadInitialValues = () => {
  return async (
    params: LoadInitialValuesParams
  ): Promise<LoadInitialValuesResult> => {
    if (!params.ids || params.ids.length === 0) {
      return { data: { data: [], count: 0 }, idMap: {} };
    }

    const { customQueryFn } = params;

    if (!customQueryFn) {
      throw new Error('customQueryFn is required. serverUrl has been removed.');
    }

    const { data, idMap: returnedIdMap } = await customQueryFn({
      searching: '',
      limit: params.ids.length,
      offset: 0,
      where: [
        {
          id: 'id',
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

export const addressSchema = {
  $id: 'http://api.localhost.com/schema/public/core_addresses.json',
  type: 'object',
  title: 'core_addresses',
  $schema: 'http://json-schema.org/draft-07/schema#',
  example: {
    region: 'in ex Lorem nostrud',
    district: 'aute Ut est labore sint',
    street_name: 'elit magna culpa labore dolore',
  },
  required: ['street_name', 'district', 'region'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      title: 'ID',
      description:
        'Missing description. Database type: uuid. Default value: uuid_generate_v4()',
    },
    region: {
      type: 'string',
      title: 'Region',
      description:
        'Missing description. Database type: text. Default value: null',
    },
    district: {
      type: 'string',
      maxLength: 255,
      title: 'District',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
      title: 'Created At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
      title: 'Updated At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
    },
    flat_number: {
      type: 'string',
      maxLength: 255,
      title: 'Flat Number',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    street_name: {
      type: 'string',
      maxLength: 255,
      title: 'Street Name',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    floor_number: {
      type: 'string',
      maxLength: 255,
      title: 'Floor Number',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    village_name: {
      type: 'string',
      maxLength: 255,
      title: 'Village Name',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    building_name: {
      type: 'string',
      maxLength: 255,
      title: 'Building Name',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    street_number: {
      type: 'string',
      maxLength: 255,
      title: 'Street Number',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
  },
  description: 'Missing description',
  additionalProperties: false,
};

export const membershipSchema = {
  $id: 'http://api.localhost.com/schema/public/core_memberships.json',
  type: 'object',
  title: 'core_memberships',
  $schema: 'http://json-schema.org/draft-07/schema#',
  example: {
    remarks: 'id sit tempor dolor',
    updated_at: '1914-05-02T07:56:26.0Z',
    expire_date: '1945-07-24T18:01:20.0Z',
    membership_id: 'aliqua commodo',
  },
  required: ['membership_id'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      title: 'ID',
      description:
        'Missing description. Database type: uuid. Default value: uuid_generate_v4()',
    },
    remarks: {
      type: 'string',
      maxLength: 255,
      title: 'Remarks',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    person_id: {
      type: 'string',
      format: 'uuid',
      variant: 'id-picker',
      column_ref: 'id',
      title: 'Person',
      description:
        'Missing description. Database type: uuid. Default value: null',
      loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
    },
    region_id: {
      type: 'string',
      format: 'uuid',
      title: 'Region',
      description:
        'Missing description. Database type: uuid. Default value: null',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
      title: 'Created At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
    },
    extra_info: {
      type: 'object',
      properties: {},
      title: 'Extra Info',
      description:
        'Missing description. Database type: jsonb. Default value: null',
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
      title: 'Updated At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
    },
    expire_date: {
      type: 'string',
      format: 'date-time',
      title: 'Expire Date',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: null',
    },
    membership_id: {
      type: 'string',
      maxLength: 255,
      title: 'Membership ID',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    person_in_charge_id: {
      type: 'string',
      format: 'uuid',
      title: 'Person In Charge',
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

export const rewardPointsTransactionsSchema = {
  $id: 'http://api.localhost.com/schema/public/reward_points_transactions.json',
  type: 'object',
  title: 'reward_points_transactions',
  $schema: 'http://json-schema.org/draft-07/schema#',
  example: {
    item: 'ullamco ad eu exercitation f',
    points: 25883355,
    item_type: 'exercitation Lorem tempor fugiat ex',
    membership_id: 'deda0eaa-2353-9e33-9d39-0c643fa24d83',
    person_in_charge_id: '20e0ff01-2553-d587-8230-0b2222ff6a7f',
  },
  required: ['item', 'points', 'person_in_charge_id', 'membership_id'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      title: 'ID',
      description:
        'Missing description. Database type: uuid. Default value: uuid_generate_v4()',
    },
    item: {
      type: 'string',
      maxLength: 255,
      title: 'Item',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    points: {
      type: 'integer',
      title: 'Points',
      description:
        'Missing description. Database type: integer. Default value: null',
    },
    comment: {
      type: 'string',
      maxLength: 255,
      title: 'Comment',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    item_type: {
      type: 'string',
      title: 'Item Type',
      description:
        "Missing description. Database type: text. Default value: 'others'",
    },
    created_at: {
      type: 'string',
      format: 'date-time',
      title: 'Created At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
    },
    extra_info: {
      type: 'object',
      properties: {},
      title: 'Extra Info',
      description:
        'Missing description. Database type: jsonb. Default value: null',
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
      title: 'Updated At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
    },
    membership_id: {
      type: 'string',
      format: 'uuid',
      title: 'Membership',
      description:
        'Missing description. Database type: uuid. Default value: null',
      variant: 'id-picker',
      column_ref: 'id',
      loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
    },
    person_in_charge_id: {
      type: 'string',
      format: 'uuid',
      title: 'Person In Charge',
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

export const activitiesSchema: CustomJSONSchema7 = {
  type: 'object',
  title: 'core_activities',
  required: ['name'],
  properties: {
    id: {
      type: 'string',
      title: 'ID',
    },
    remarks: {
      type: 'string',
      title: 'Remarks',
      gridColumn: '1/span 12',
      gridRow: '8/span 1',
    },
    end_date: {
      type: 'string',
      format: 'date',
      title: 'End Date',
      gridColumn: '7/span 3',
      gridRow: '4/span 1',
    },
    end_time: {
      type: 'string',
      format: 'time',
      title: 'End Time',
      gridColumn: '10/span 3',
      gridRow: '4/span 1',
      description:
        'Missing description. Database type: time without time zone. Default value: null',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
      title: 'Created At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
    },
    name: {
      type: 'string',
      maxLength: 255,
      title: 'Name',
      description:
        'Missing description. Database type: character varying. Default value: null',
      gridColumn: '1/span 12',
      gridRow: '1/span 1',
      customQueryFn: async (params: CustomQueryFnParams) => {
        const data = await axios.get(
          `http://localhost:8081/api/g/core_people`,
          {
            params: {
              searching: params.searching,
              limit: params.limit,
              offset: params.offset,
            },
          }
        );
        return data;
      },
    },
    start_date: {
      type: 'string',
      format: 'date',
      title: 'Start Date',
      gridColumn: '1/span 3',
      gridRow: '4/span 1',
    },
    start_date2: {
      type: 'string',
      format: 'date',
      title: 'Start Date 2',
    },
    start_time: {
      type: 'string',
      format: 'time',
      title: 'Start Time',
      gridColumn: '4/span 3',
      gridRow: '4/span 1',
    },
    description: {
      type: 'string',
      variant: 'text-area',
      title: 'Description',
      description:
        'Missing description. Database type: text. Default value: null',
      gridColumn: '1/span 12',
      gridRow: '6/span 1',
    },
    is_recurring: {
      type: 'boolean',
      title: 'Is Recurring',
      description:
        'Missing description. Database type: boolean. Default value: false',
      gridColumn: '1/span 3',
      gridRow: '5/span 1',
    },
    recurring_days: {
      type: 'string',
      title: 'Recurring Days',
      gridColumn: '7/span 3',
      gridRow: '5/span 1',
      enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    },
    recurring_type: {
      type: 'string',
      title: 'Recurring Type',
      gridColumn: '4/span 3',
      gridRow: '5/span 1',
      enum: ['daily', 'weekly', 'biweekly', 'monthly'],
    },
    parent_event_id: {
      type: 'string',
      format: 'uuid',
      title: 'Parent Event',
      gridColumn: '1/span 6',
      gridRow: '2/span 1',
      variant: 'id-picker',
      loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
    },
  },
};

export const peopleSchema = {
  $id: 'core_people',
  type: 'object',
  title: 'core_people',
  $schema: 'http://json-schema.org/draft-07/schema#',
  example: {
    last_name: 'non amet',
    created_at: '1897-01-02T05:48:45.0Z',
    deleted_at: '1934-04-08T13:37:33.0Z',
    first_name: 'non sed',
    date_of_birth: '1905-03-09',
    telephone_number: 'in',
  },
  required: ['first_name', 'last_name'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      title: 'ID',
      description:
        'Missing description. Database type: uuid. Default value: uuid_generate_v4()',
    },
    bio: {
      type: 'string',
      title: 'Bio',
      description:
        'Missing description. Database type: text. Default value: null',
    },
    tags: {
      type: 'object',
      properties: {},
      title: 'Tags',
      description:
        'Missing description. Database type: json. Default value: null',
    },
    email: {
      type: 'string',
      maxLength: 255,
      title: 'Email',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    last_name: {
      type: 'string',
      maxLength: 255,
      title: 'Last Name',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
      title: 'Created At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
    },
    deleted_at: {
      type: 'string',
      format: 'date-time',
      title: 'Deleted At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: null',
    },
    extra_info: {
      type: 'object',
      properties: {},
      title: 'Extra Info',
      description:
        'Missing description. Database type: jsonb. Default value: null',
    },
    first_name: {
      type: 'string',
      maxLength: 255,
      title: 'First Name',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
      title: 'Updated At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
    },
    date_of_birth: {
      type: 'string',
      format: 'date',
      title: 'Date of Birth',
      description:
        'Missing description. Database type: date. Default value: null',
    },
    telephone_number: {
      type: 'string',
      maxLength: 255,
      title: 'Telephone Number',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    profile_picture_url: {
      type: 'string',
      maxLength: 255,
      title: 'Profile Picture URL',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
  },
  description: 'Missing description',
  searchingColumns: ['first_name', 'last_name'],
  additionalProperties: false,
};

export const eventsTagsSchema = {
  $id: 'http://api.localhost.com/schema/public/events_tags.json',
  type: 'object',
  title: 'events_tags',
  $schema: 'http://json-schema.org/draft-07/schema#',
  example: {
    tag_id: 'f1c6ca09-62c5-7d05-a8b8-7404ce942895',
    event_id: 'b0a00018-b6b1-c5b8-e53a-5e430a5bf653',
    extra_info: {
      exercitation6d: -88901105,
    },
  },
  required: ['event_id', 'tag_id'],
  properties: {
    tag_id: {
      type: 'array',
      format: 'uuid',
      title: 'Tags',
      description:
        'Missing description. Database type: uuid. Default value: null',
      variant: 'tag-picker',
      gridColumn: '1/span 12',
      gridRow: '2/span 1',
    },
    event_id: {
      type: 'string',
      format: 'uuid',
      title: 'Event',
      description:
        'Missing description. Database type: uuid. Default value: null',
      variant: 'id-picker',
      column_ref: 'id',
      gridColumn: '1/span 6',
      gridRow: '1/span 1',
      loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
    },
    extra_info: {
      type: 'object',
      properties: {},
      title: 'Extra Info',
      description:
        'Missing description. Database type: jsonb. Default value: null',
      gridColumn: '1/span 6',
      gridRow: '3/span 1',
    },
  },
  description: 'Missing description',
  additionalProperties: false,
};

export const membershipsSchema = {
  $id: 'http://api.localhost.com/schema/public/memberships_tags.json',
  type: 'object',
  title: 'memberships_tags',
  $schema: 'http://json-schema.org/draft-07/schema#',
  example: {
    tag_id: '2ca1d1cb-b0a8-78e1-b819-410a2eb0fb1a',
    membership_id: '8ec87ba6-7c30-df29-3b93-269563520f00',
  },
  required: ['membership_id', 'tag_id'],
  properties: {
    tag_id: {
      type: 'string',
      format: 'uuid',
      title: 'Tags',
      description:
        'Missing description. Database type: uuid. Default value: null',
      variant: 'tag-picker',
      gridColumn: '1/span 12',
      gridRow: '2/span 1',
    },
    extra_info: {
      type: 'object',
      properties: {},
      title: 'Extra Info',
      description:
        'Missing description. Database type: jsonb. Default value: null',
      gridColumn: '1/span 6',
      gridRow: '3/span 1',
    },
    membership_id: {
      type: 'string',
      format: 'uuid',
      title: 'Membership',
      description:
        'Missing description. Database type: uuid. Default value: null',
      gridColumn: '1/span 6',
      gridRow: '1/span 1',
      variant: 'id-picker',
      column_ref: 'id',
      loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
    },
  },
  description: 'Missing description',
  additionalProperties: false,
};

export const eventsFilesSchema = {
  $id: 'http://api.localhost.com/schema/public/events_files.json',
  type: 'object',
  title: 'events_files',
  $schema: 'http://json-schema.org/draft-07/schema#',
  example: {
    file_id: '4f56b583-9e16-f49a-bbc3-3fdcefd3e68e',
    event_id: '8df9c8c1-7572-6f33-abfb-cfe0cca4c659',
    extra_info: {
      aute__e_: true,
      mollit_0e: true,
    },
  },
  required: ['event_id', 'file_id'],
  properties: {
    file_id: {
      type: 'array',
      variant: 'file-picker',
      title: 'Files',
      gridColumn: '1/span 8',
      gridRow: '2/span 8',
    },
    event_id: {
      type: 'string',
      variant: 'id-picker',
      title: 'Event',
      gridColumn: '1/span 6',
      gridRow: '1/span 1',
      loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
    },
    good: {
      type: 'string',
      title: 'Good',
    },
    nice: {
      type: 'string',
      title: 'Nice',
    },
  },
  description: 'Missing description',
  additionalProperties: false,
};

export const eventsFilesSchema2 = {
  type: 'object',
  title: 'events_files',
  required: ['event_id', 'file_id'],
  properties: {
    file_id: {
      type: 'array',
      format: 'uuid',
      variant: 'id-picker',
      title: 'Files',
      gridColumn: '1/span 8',
      gridRow: '2/span 8',
      loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
    },
    event_id: {
      type: 'string',
      format: 'uuid',
      variant: 'id-picker',
      title: 'Event',
      gridColumn: '1/span 6',
      gridRow: '1/span 1',
      loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
    },
    good: {
      type: 'array',
      variant: 'file-picker',
      title: 'Good',
      properties: {},
    },
    some_text_area: {
      type: 'string',
      variant: 'text-area',
      title: 'Some Text Area',
    },
  },
  description: 'Missing description',
  additionalProperties: false,
};

export const geolocationSchema = {
  type: 'object',
  title: 'core_geolocations',
  required: ['location_name'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      title: 'ID',
    },
    city: {
      type: 'string',
      maxLength: 255,
      title: 'City',
    },
    region: {
      type: 'string',
      maxLength: 255,
      title: 'Region',
    },
    street: {
      type: 'string',
      maxLength: 255,
      title: 'Street',
    },
    country: {
      type: 'string',
      maxLength: 255,
      title: 'Country',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    district: {
      type: 'string',
      maxLength: 255,
      title: 'District',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
    latitude: {
      type: 'number',
      title: 'Latitude',
      description:
        'Missing description. Database type: double precision. Default value: null',
    },
    longitude: {
      type: 'number',
      title: 'Longitude',
      description:
        'Missing description. Database type: double precision. Default value: null',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
      title: 'Created At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
    },
    deleted_at: {
      type: 'string',
      format: 'date-time',
      title: 'Deleted At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: null',
    },
    extra_info: {
      type: 'object',
      properties: {},
      title: 'Extra Info',
      description:
        'Missing description. Database type: jsonb. Default value: null',
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
      title: 'Updated At',
      description:
        'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
    },
    description: {
      type: 'string',
      title: 'Description',
      description:
        'Missing description. Database type: text. Default value: null',
    },
    location_name: {
      type: 'string',
      maxLength: 255,
      title: 'Location Name',
      description:
        'Missing description. Database type: character varying. Default value: null',
    },
  },
  description: 'Missing description',
  additionalProperties: false,
};
