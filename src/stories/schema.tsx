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
