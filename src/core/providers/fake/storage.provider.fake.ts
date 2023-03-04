import { type IStorageProvider } from '../storage.provider.interface';

export default class StorageProviderFake implements IStorageProvider {
  private readonly storage: string[] = [];

  public async saveFile(
    file: string | Uint8Array | Buffer,
    fileName: string
  ): Promise<string> {
    this.storage.push(fileName);
    return fileName;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file
    );

    this.storage.splice(findIndex, 1);
  }
}
