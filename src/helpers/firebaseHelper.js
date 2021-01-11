/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import storage from '@react-native-firebase/storage';

export const uploadUserPicture = async (imagePath, email) => {
  const reference = storage().ref('/profilePictures/' + email + '.png');

  return new Promise(async (resolve, reject) => {
    try {
      await reference.putFile(imagePath);
      const url = await getUserPictureUrl(email);
      resolve(url);
    } catch (err) {
      reject(err);
    }
  });
};

export const getUserPictureUrl = async (email) => {
  const url = await storage()
    .ref('profilePictures/' + email + '.png')
    .getDownloadURL();
  return url;
};
