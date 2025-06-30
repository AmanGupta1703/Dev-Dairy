import { Client, Databases, Query } from "appwrite";

import { config } from "../../config";

type CreatePostParams = {
  title: string;
  slug: string;
  featuredImage: string;
  description: string;
  status: string;
  content: string;
  userId: string;
};

type TUpdatePostParam = {
  title: string;
  featuredImage: string;
  description: string;
  status: string;
  content: string;
};

class DatabaseService {
  client = new Client();
  database: Databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createPost({
    title,
    slug,
    featuredImage,
    description,
    status,
    content,
    userId,
  }: CreatePostParams) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, featuredImage, description, status, content, userId },
      );
    } catch (error) {
      console.log("DatabaseService :: createPost :: error ::", error);
      throw error;
    }
  }

  async getPost(slug: string) {
    try {
      return this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("DatabaseService :: getPost :: error ::", error);
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("DatabaseService :: getPosts :: error ::", error);
      throw error;
    }
  }

  async updatePost(
    { title, featuredImage, description, status, content }: TUpdatePostParam,
    slug: string,
  ) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, featuredImage, description, status, content },
      );
    } catch (error) {
      console.log("DatabaseService :: updatePost :: error ::", error);
      throw error;
    }
  }

  async deletePost(slug: string) {
    try {
      return this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("DatabaseService :: deletePost :: error ::", error);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();

export { databaseService };
