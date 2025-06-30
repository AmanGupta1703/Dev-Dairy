import { Client, Storage, ID } from "appwrite";

import { config } from "../../config";

class StorageService {
  client = new Client();
  storage: Storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file: File) {
    try {
      return this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("StorageService :: uploadFile :: error ::", error);
      throw error;
    }
  }

  async deleteFile(fileId: string) {
    try {
      this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("StorageService :: deleteFile :: error ::", error);
      return false;
    }
  }

  getFilePreview(fileId: string) {
    try {
      return this.storage.getFileView(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("StorageService :: getFilePreview :: error ::", error);
      throw error;
    }
  }
}

const storageService = new StorageService();

export { storageService };
