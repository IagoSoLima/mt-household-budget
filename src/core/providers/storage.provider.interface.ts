export interface IStorageProvider {
  saveFile: (
    file: string | Uint8Array | Buffer,
    fileName: string
  ) => Promise<string>;
  deleteFile: (file: string) => Promise<void>;
}
