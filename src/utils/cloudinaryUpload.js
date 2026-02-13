import { CLOUDINARY_CONFIG } from "./cloudinary";

export async function uploadToCloudinary(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();
  return result.secure_url;
}
