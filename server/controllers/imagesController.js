import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const deleteImage = async (req, res) => {
  const { public_id } = req.params;
  try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
};

export default deleteImage;
