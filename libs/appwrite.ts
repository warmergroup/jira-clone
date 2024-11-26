import { Client, Account, ID, Databases, OAuthProvider } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66d40e0d0018f693449a");
export const ACCOUNT = new Account(client);
export const DATABASE = new Databases(client);
export const OAUTH_PROVIDER = OAuthProvider;
export const UNIQUE_ID = () => {
  return ID.unique();
};
