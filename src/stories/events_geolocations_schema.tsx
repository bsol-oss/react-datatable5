export const eventGeolocationsSchema = {
  $id: "http://api.localhost.com/schema/public/events_geolocations.json",
  type: "object",
  title: "events_geolocations",
  $schema: "http://json-schema.org/draft-07/schema#",
  example: {
    event_id: "4f256c4c-0620-2390-63bf-3c3dead0d0bf",
    geolocation_id: "e593cb5c-9000-cf9e-b8ad-f9c390992f14",
  },
  required: ["geolocation_id", "event_id"],
  properties: {
    event_id: {
      type: "string",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: null",
        variant: "id-picker",
        in_table: "core_events",
        column_ref: "id",
        display_column: "event_name",
    },
    extra_info: {
      type: "object",
      properties: {},
      description:
        "Missing description. Database type: jsonb. Default value: null",
    },
    geolocation_id: {
      type: "array",
      format: "uuid",
      description:
        "Missing description. Database type: uuid. Default value: null",
      variant: "id-picker",
      in_table: "core_geolocations",
      column_ref: "id",
      display_column: "name",
    },
  },
  description: "Missing description",
  additionalProperties: false,
};
