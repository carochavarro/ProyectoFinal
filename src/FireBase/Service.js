// src/services/imageService.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./FireBaseConfig"; // Asegúrate de usar la ruta correcta

// Función para subir una sola imagen a Firebase Storage y obtener su URL
export const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`); // Corregido: comillas invertidas
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url; // Esta URL es la que puedes guardar en MongoDB
};

// Función para subir múltiples imágenes y obtener un array de URLs
export const uploadImages = async (files) => {
  const uploadPromises = files.map((file) => uploadImage(file));
  const urls = await Promise.all(uploadPromises);
  return urls;
};