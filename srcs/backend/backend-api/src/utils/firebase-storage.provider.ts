
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'

export class FirebaseStorageProvider {
    async upload (
        file: Express.Multer.File,
        path: string,
        fileName: string
    ) : Promise<string> {
        const storage = getStorage();
        const fileExtension = file.originalname.split('.').pop();
        const fileRef = ref(storage, `${path}/${fileName}.${fileExtension}`);

        await uploadBytes(fileRef, file.buffer);
        const uploadUrl = await getDownloadURL(fileRef);

        return uploadUrl;
    }
}