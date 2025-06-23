import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

// const client = createClient({
//   url: process.env.TURSO_CONNECTION_URL!,
//   authToken: process.env.TURSO_AUTH_TOKEN!,
// });
const client = createClient({
  url: "libsql://myshop-rarobenson.aws-ap-south-1.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDgxMjgxNDAsImlkIjoiZDA3MzY4MGEtZTc4Ny00NmZjLWJjNjktOTM4MWJlMGViZTk5IiwicmlkIjoiNmIxYjY1ZDktZTdkNy00MDE3LWJiNjItZGVjMDQxNzNkYzhmIn0.994cIng3iltrAM7Mer9gwofou3CKteH20laWxQG6Uc-FAOqPOzUoqv4PIbL0A6lmis6QpcGe6WjTU08TV7BIBw",
});

export const db = drizzle(client, { schema });
