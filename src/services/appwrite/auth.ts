import { Client, Account, ID } from "appwrite";

import { config } from "../../config";

type AuthParams = {
  email: string;
  password: string;
  fullName?: string;
};

class AuthService {
  client = new Client();
  account: Account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // Create Account

  async createAccount({ email, password, fullName }: AuthParams) {
    try {
      const session = await this.account.create(
        ID.unique(),
        email,
        password,
        fullName,
      );

      if (session) {
        return this.login({ email, password });
      }
    } catch (error) {
      console.log("AuthService :: createAccount :: error ::", error);
      throw error;
    }
  }

  // Login
  async login({ email, password }: AuthParams) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("AuthService :: login :: error ::", error);
      throw error;
    }
  }

  // Get Logged-In User Details
  async getLoggedInUserDetails() {
    try {
      return this.account.get();
    } catch (error) {
      console.log("AuthService :: getLoggedInUserDetails :: error ::", error);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log("AuthService :: logout :: error", error);
      return false;
    }
  }
}

const authService = new AuthService();

export { authService };
