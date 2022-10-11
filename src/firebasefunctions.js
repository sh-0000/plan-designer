import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./firebase";

const db = getFirestore(app);

const storage = getStorage(app);
const storageRef = ref(storage);

const useFirestore = () => {
  async function getCollection(collectionRef) {
    const snapshot = await getDocs(collection(db, collectionRef));
    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return data;
  }
  async function getDocument(collectionRef, id) {
    const snapshot = await getDoc(doc(db, collectionRef, id));
    return { id: id, ...snapshot.data() };
  }

  async function setCollection(collectionRef, data) {
    const res = await addDoc(collection(db, collectionRef), {
      ...data,
    });
    return { id: res.id, ...data };
  }

  async function removeDocument(collectionRef, id) {
    await deleteDoc(doc(db, collectionRef, id));
  }

  async function uploadFile(collectionRef, file) {
    const fileName = file.name + " " + Date.now();
    const destRef = ref(storageRef, collectionRef);
    const fileRef = ref(destRef, fileName);
    const uploadTask = uploadBytes(fileRef, file).then(
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

  return {
    getCollection,
    getDocument,
    setCollection,
    removeDocument,
    uploadFile,
  };
};

export default useFirestore;
