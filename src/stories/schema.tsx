import { JSONSchema6, JSONSchema7 } from "json-schema";

export const addressSchema = {
  $id: "http://api.localhost.com/schema/public/core_addresses.json",
  type: "object",
  title: "core_addresses",
  $schema: "http://json-schema.org/draft-07/schema#",
  example: {
    region: "in ex Lorem nostrud",
    district: "aute Ut est labore sint",
    street_name: "elit magna culpa labore dolore",
  },
  required: ["street_name", "district", "region"],
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: uuid_generate_v4()",
    },
    region: {
      type: "string",
      description:
        "Missing description. Database type: text. Default value: null",
    },
    district: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    created_at: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
    },
    flat_number: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    street_name: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    floor_number: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    village_name: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    building_name: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    street_number: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
  },
  description: "Missing description",
  additionalProperties: false,
};

export const membershipSchema = {
  $id: "http://api.localhost.com/schema/public/core_memberships.json",
  type: "object",
  title: "core_memberships",
  $schema: "http://json-schema.org/draft-07/schema#",
  example: {
    remarks: "id sit tempor dolor",
    updated_at: "1914-05-02T07:56:26.0Z",
    expire_date: "1945-07-24T18:01:20.0Z",
    membership_id: "aliqua commodo",
  },
  required: ["membership_id"],
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: uuid_generate_v4()",
    },
    remarks: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    person_id: {
      type: "string",
      format: "uuid",
      variant: "id-picker",
      in_table: "core_people",
      column_ref: "id",
      display_column: "first_name",
      description:
        "Missing description. Database type: uuid. Default value: null",
    },
    region_id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: null",
    },
    created_at: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
    },
    extra_info: {
      type: "object",
      properties: {},
      description:
        "Missing description. Database type: jsonb. Default value: null",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
    },
    expire_date: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: null",
    },
    membership_id: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    person_in_charge_id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: null",
      variant: "id-picker",
      in_table: "core_people",
      column_ref: "id",
      display_column: "first_name",
    },
  },
  description: "Missing description",
  additionalProperties: false,
};

export const rewardPointsTransactionsSchema = {
  $id: "http://api.localhost.com/schema/public/reward_points_transactions.json",
  type: "object",
  title: "reward_points_transactions",
  $schema: "http://json-schema.org/draft-07/schema#",
  example: {
    item: "ullamco ad eu exercitation f",
    points: 25883355,
    item_type: "exercitation Lorem tempor fugiat ex",
    membership_id: "deda0eaa-2353-9e33-9d39-0c643fa24d83",
    person_in_charge_id: "20e0ff01-2553-d587-8230-0b2222ff6a7f",
  },
  required: ["item", "points", "person_in_charge_id", "membership_id"],
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: uuid_generate_v4()",
    },
    item: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    points: {
      type: "integer",
      description:
        "Missing description. Database type: integer. Default value: null",
    },
    comment: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    item_type: {
      type: "string",
      description:
        "Missing description. Database type: text. Default value: 'others'",
    },
    created_at: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
    },
    extra_info: {
      type: "object",
      properties: {},
      description:
        "Missing description. Database type: jsonb. Default value: null",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
    },
    membership_id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: null",
      variant: "id-picker",
      in_table: "core_memberships",
      column_ref: "id",
      display_column: "membership_id",
    },
    person_in_charge_id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: null",
      variant: "id-picker",
      in_table: "core_people",
      column_ref: "id",
      display_column: "first_name",
    },
  },
  description: "Missing description",
  additionalProperties: false,
};

export const eventsSchema = {
  $id: "http://api.localhost.com/schema/public/core_events.json",
  type: "object",
  title: "core_events",
  $schema: "http://json-schema.org/draft-07/schema#",
  example: {
    id: "96ae1dd7-e13a-0210-5e73-64fda2b38495",
    fee: -59976193.56805224,
    quota: -9014054,
    status: "tempor",
    remarks: "deserunt ut sed consequat",
    end_date: "1932-11-22",
    end_time: "21:18:36.220Z",
    created_at: "1916-06-22T20:51:15.0Z",
    event_name: "ut quis nisi cillum",
    extra_info: {
      eu_e05: "voluptate dolor veniam proident",
      veniam_4: "velit dolore culpa reprehenderit",
      cupidatate9: "esse aliquip laborum do cupidatat",
    },
    start_date: "1959-05-20",
    start_time: "19:13:14.205Z",
    updated_at: "1896-06-15T18:48:15.0Z",
    description: "reprehenderit",
    location_id: "a2cc684e-b50c-35f5-a2a2-c50f521d0f50",
    is_recurring: true,
    recurring_days: "eiusmod mollit",
    parent_event_id: "e73af37d-252d-0022-ae4b-3b8fc70f856e",
  },
  required: ["event_name"],
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: uuid_generate_v4()",
    },
    fee: {
      type: "number",
      description:
        "Missing description. Database type: numeric. Default value: null",
      gridColumn: "1/span 2",
      gridRow: "7/span 1",
    },
    quota: {
      type: "integer",
      description:
        "Missing description. Database type: integer. Default value: null",
      gridColumn: "3/span 2",
      gridRow: "7/span 1",
    },
    status: {
      type: "string",
      description:
        "Missing description. Database type: text. Default value: 'draft'",
      gridColumn: "7/span 2",
      gridRow: "7/span 1",
    },
    remarks: {
      type: "string",
      description:
        "Missing description. Database type: text. Default value: null",
      gridColumn: "1/span 12",
      gridRow: "8/span 1",
    },
    end_date: {
      type: "string",
      variant: "date-picker",
      format: "date",
      gridColumn: "7/span 3",
      gridRow: "4/span 1",
      description:
        "Missing description. Database type: date. Default value: null",
    },
    end_time: {
      type: "string",
      format: "time",
      gridColumn: "10/span 3",
      gridRow: "4/span 1",
      description:
        "Missing description. Database type: time without time zone. Default value: null",
    },
    created_at: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
    },
    event_name: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
      gridColumn: "1/span 12",
      gridRow: "1/span 1",
    },
    extra_info: {
      type: "object",
      properties: {},
      description:
        "Missing description. Database type: jsonb. Default value: null",
      gridColumn: "1/span 4",
      gridRow: "9/span 1",
    },
    start_date: {
      type: "string",
      variant: "date-picker",
      gridColumn: "1/span 3",
      gridRow: "4/span 1",
      format: "date",
      description:
        "Missing description. Database type: date. Default value: null",
    },
    start_time: {
      type: "string",
      format: "time",
      gridColumn: "4/span 3",
      gridRow: "4/span 1",
      description:
        "Missing description. Database type: time without time zone. Default value: null",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
    },
    description: {
      type: "string",
      description:
        "Missing description. Database type: text. Default value: null",
      gridColumn: "1/span 12",
      gridRow: "6/span 1",
    },
    location_id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: null",
      gridColumn: "1/span 6",
      gridRow: "3/span 1",
    },
    is_recurring: {
      type: "boolean",
      description:
        "Missing description. Database type: boolean. Default value: false",
      gridColumn: "1/span 3",
      gridRow: "5/span 1",
    },
    recurring_days: {
      type: "string",
      description:
        "Missing description. Database type: text. Default value: null",
      gridColumn: "7/span 3",
      gridRow: "5/span 1",
    },
    recurring_type: {
      type: "string",
      description:
        "Missing description. Database type: text. Default value: null",
      gridColumn: "4/span 3",
      gridRow: "5/span 1",
    },
    parent_event_id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: null",
      gridColumn: "1/span 6",
      gridRow: "2/span 1",
    },
  },
  description: "Missing description",
  additionalProperties: false,
} as JSONSchema7;
