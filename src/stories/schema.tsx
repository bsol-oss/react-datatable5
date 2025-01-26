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
    },
  },
  description: "Missing description",
  additionalProperties: false,
};
