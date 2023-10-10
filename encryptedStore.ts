import EncryptedStorage from 'react-native-encrypted-storage';

export const storeSecureData = async (key: string, data: any) => {
    try {
        await EncryptedStorage.setItem(
            key,
            JSON.stringify(data)
        );
    } catch (error) {
        console.log('Error in saving local store', error);
    }
}

export const retrieveSecureData = async (key: string) => {
    try {   
        const data = await EncryptedStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    } catch (error) {
        console.log('Error in retrieving local store', error);
    }
}

export const removeSecureData = async (key: string) => {
    try {
        await EncryptedStorage.removeItem(key);
    } catch (error) {
        console.log('Error in removing from local store', error);
    }
}

export const clearStorage = async () => {
    try {
        await EncryptedStorage.clear();
    } catch (error) {
        console.log('Error in clearing local store', error);
    }
}