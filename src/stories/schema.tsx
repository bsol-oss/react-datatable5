import { JSONSchema7 } from "json-schema";

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

export const activitiesSchema = {
  type: "object",
  title: "core_activities",
  required: ["name"],
  properties: {
    id: {
      type: "string",
    },
    remarks: {
      type: "string",
      gridColumn: "1/span 12",
      gridRow: "8/span 1",
    },
    end_date: {
      type: "string",
      variant: "date-picker",
      format: "date",
      gridColumn: "7/span 3",
      gridRow: "4/span 1",
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
    name: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
      gridColumn: "1/span 12",
      gridRow: "1/span 1",
    },
    start_date: {
      type: "string",
      variant: "date-picker",
      gridColumn: "1/span 3",
      gridRow: "4/span 1",
    },
    start_time: {
      type: "string",
      variant: "time-picker",
      gridColumn: "4/span 3",
      gridRow: "4/span 1",
    },
    description: {
      type: "string",
      description:
        "Missing description. Database type: text. Default value: null",
      gridColumn: "1/span 12",
      gridRow: "6/span 1",
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
      gridColumn: "7/span 3",
      gridRow: "5/span 1",
      enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    },
    recurring_type: {
      type: "string",
      gridColumn: "4/span 3",
      gridRow: "5/span 1",
      enum: ["daily", "weekly", "biweekly", "monthly"],
    },
    parent_event_id: {
      type: "string",
      format: "uuid",
      gridColumn: "1/span 6",
      gridRow: "2/span 1",
      variant: "id-picker",
      foreign_key: {
        display_column: "name",
        table: "core_activities",
        column: "id",
      },
    },
  },
} as JSONSchema7;

export const peopleSchema = {
  $id: "core_people",
  type: "object",
  title: "core_people",
  $schema: "http://json-schema.org/draft-07/schema#",
  example: {
    last_name: "non amet",
    created_at: "1897-01-02T05:48:45.0Z",
    deleted_at: "1934-04-08T13:37:33.0Z",
    first_name: "non sed",
    date_of_birth: "1905-03-09",
    telephone_number: "in",
  },
  required: ["first_name", "last_name"],
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: uuid_generate_v4()",
    },
    bio: {
      type: "string",
      description:
        "Missing description. Database type: text. Default value: null",
    },
    tags: {
      type: "object",
      properties: {},
      description:
        "Missing description. Database type: json. Default value: null",
    },
    email: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    last_name: {
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
    deleted_at: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: null",
    },
    extra_info: {
      type: "object",
      properties: {},
      description:
        "Missing description. Database type: jsonb. Default value: null",
    },
    first_name: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
    },
    date_of_birth: {
      type: "string",
      format: "date",
      description:
        "Missing description. Database type: date. Default value: null",
    },
    telephone_number: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    profile_picture_url: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
  },
  description: "Missing description",
  searchingColumns: ["first_name", "last_name"],
  additionalProperties: false,
};

export const eventsTagsSchema = {
  $id: "http://api.localhost.com/schema/public/events_tags.json",
  type: "object",
  title: "events_tags",
  $schema: "http://json-schema.org/draft-07/schema#",
  example: {
    tag_id: "f1c6ca09-62c5-7d05-a8b8-7404ce942895",
    event_id: "b0a00018-b6b1-c5b8-e53a-5e430a5bf653",
    extra_info: {
      exercitation6d: -88901105,
    },
  },
  required: ["event_id", "tag_id"],
  properties: {
    tag_id: {
      type: "array",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: null",
      variant: "tag-picker",
      in_table: "events_tags",
      object_id_column: "event_id",
      gridColumn: "1/span 12",
      gridRow: "2/span 1",
    },
    event_id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: null",
      variant: "id-picker",
      in_table: "core_events",
      column_ref: "id",
      display_column: "event_name",
      gridColumn: "1/span 6",
      gridRow: "1/span 1",
    },
    extra_info: {
      type: "object",
      properties: {},
      description:
        "Missing description. Database type: jsonb. Default value: null",
      gridColumn: "1/span 6",
      gridRow: "3/span 1",
    },
  },
  description: "Missing description",
  additionalProperties: false,
};

export const membershipsSchema = {
  $id: "http://api.localhost.com/schema/public/memberships_tags.json",
  type: "object",
  title: "memberships_tags",
  $schema: "http://json-schema.org/draft-07/schema#",
  example: {
    tag_id: "2ca1d1cb-b0a8-78e1-b819-410a2eb0fb1a",
    membership_id: "8ec87ba6-7c30-df29-3b93-269563520f00",
  },
  required: ["membership_id", "tag_id"],
  properties: {
    tag_id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: null",
      variant: "tag-picker",
      in_table: "memberships_tags",
      object_id_column: "membership_id",
      gridColumn: "1/span 12",
      gridRow: "2/span 1",
    },
    extra_info: {
      type: "object",
      properties: {},
      description:
        "Missing description. Database type: jsonb. Default value: null",
      gridColumn: "1/span 6",
      gridRow: "3/span 1",
    },
    membership_id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: null",
      gridColumn: "1/span 6",
      gridRow: "1/span 1",
      variant: "id-picker",
      in_table: "core_memberships",
      column_ref: "id",
      display_column: "membership_id",
    },
  },
  description: "Missing description",
  additionalProperties: false,
};

export const eventsFilesSchema = {
  $id: "http://api.localhost.com/schema/public/events_files.json",
  type: "object",
  title: "events_files",
  $schema: "http://json-schema.org/draft-07/schema#",
  example: {
    file_id: "4f56b583-9e16-f49a-bbc3-3fdcefd3e68e",
    event_id: "8df9c8c1-7572-6f33-abfb-cfe0cca4c659",
    extra_info: {
      aute__e_: true,
      mollit_0e: true,
    },
  },
  required: ["event_id", "file_id"],
  properties: {
    file_id: {
      type: "array",
      variant: "file-picker",
      gridColumn: "1/span 8",
      gridRow: "2/span 8",
    },
    event_id: {
      type: "string",

      variant: "id-picker",
      gridColumn: "1/span 6",
      gridRow: "1/span 1",
      foreign_key: {
        display_column: "event_name",
        table: "core_events",
        column: "id",
      },
    },
    good: {
      type: "string",
    },
    nice: {
      type: "string",
    },
  },
  description: "Missing description",
  additionalProperties: false,
};

export const eventsFilesSchema2 = {
  type: "object",
  title: "events_files",
  required: ["event_id", "file_id"],
  properties: {
    file_id: {
      type: "array",
      format: "uuid",
      variant: "id-picker",
      foreign_key: {
        table: "core_files",
        column: "id",
        display_column: "name",
      },
      gridColumn: "1/span 8",
      gridRow: "2/span 8",
    },
    event_id: {
      type: "string",
      format: "uuid",
      variant: "id-picker",
      foreign_key: {
        table: "core_events",
        column: "id",
        display_column: "event_name",
      },
      gridColumn: "1/span 6",
      gridRow: "1/span 1",
    },
    good: {
      type: "array",
      variant: "file-picker",
      properties: {},
    },
  },
  description: "Missing description",
  additionalProperties: false,
};

export const geolocationSchema = {
  type: "object",
  title: "core_geolocations",
  required: ["location_name"],
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
    city: {
      type: "string",
      maxLength: 255,
    },
    region: {
      type: "string",
      maxLength: 255,
    },
    street: {
      type: "string",
      maxLength: 255,
    },
    country: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    district: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
    latitude: {
      type: "number",
      description:
        "Missing description. Database type: double precision. Default value: null",
    },
    longitude: {
      type: "number",
      description:
        "Missing description. Database type: double precision. Default value: null",
    },
    created_at: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
    },
    deleted_at: {
      type: "string",
      format: "date-time",
      description:
        "Missing description. Database type: timestamp with time zone. Default value: null",
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
    description: {
      type: "string",
      description:
        "Missing description. Database type: text. Default value: null",
    },
    location_name: {
      type: "string",
      maxLength: 255,
      description:
        "Missing description. Database type: character varying. Default value: null",
    },
  },
  description: "Missing description",
  additionalProperties: false,
};
