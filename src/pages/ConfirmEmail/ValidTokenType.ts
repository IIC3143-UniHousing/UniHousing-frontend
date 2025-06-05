export const ValidTokenType = {
  Valid: "Valid",
  Expired: "Expired",
  Used: "Used",
  Waiting: "Waiting",
  Requested: "Requested",
  Error: "Error"
} as const;

export type ValidTokenType = (typeof ValidTokenType)[keyof typeof ValidTokenType];
