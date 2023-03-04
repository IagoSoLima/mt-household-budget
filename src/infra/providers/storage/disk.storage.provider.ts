import fs from 'fs';
import path from 'path';
import { type IStorageProvider } from '~/core/providers/storage.provider.interface';
import {
  APP_HOST_URL,
  TMP_FOLDER,
  UPLOADS_FOLDER
} from '~/infra/vars/app.vars';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(
    file: string | Uint8Array | Buffer,
    fileName: string
  ): Promise<string> {
    fs.writeFile(
      path.join(path.resolve(UPLOADS_FOLDER + '/'), fileName),
      file,
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('The file was saved!');
        }
      }
    );

    return APP_HOST_URL + '/files/' + fileName;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
