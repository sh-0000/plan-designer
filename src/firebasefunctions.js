import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./firebase";

const db = getFirestore(app);

const storage = getStorage(app);
const storageRef = ref(storage);

const useFirestore = () => {
  async function getCollection(colRef) {
    const snapshot = await getDocs(collection(db, colRef));
    const data = snapshot.docs.map((doc) => doc.data());
    return data;
  }

  async function setCollection(colRef, data) {
    console.log(data);
    const res = await addDoc(collection(db, colRef), {
      ...data,
    });
  }

  async function uploadFile(colRef, file) {
    const fileName = file.name + " " + Date.now();
    const destRef = ref(storageRef, colRef);
    const fileRef = ref(destRef, fileName);
    const uploadTask = uploadBytes(destRef, file).then(
      (snapshot) => {
        console.log("upload successful");
        return getDownloadURL(snapshot.ref);
      },
      (error) => {
        console.log(error);
      }
    );
    return uploadTask;
  }

  return { getCollection, setCollection, uploadFile };
};

export default useFirestore;
