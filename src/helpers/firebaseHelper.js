import storage from '@react-native-firebase/storage';

export const uploadUserPicture = async (imagePath, email) => {
  const reference = storage().ref('/profilePictures/' + email + '.png');
  const task = reference.putFile(imagePath);

  task.then(() => {
    console.log('Image uploaded to the bucket!');
  });
};

export const getUserPictureUrl = async (email) => {};
