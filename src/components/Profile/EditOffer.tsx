import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import removePhotoFromCloudinary from '../../utils/cloudinaryApi';
import LoadingOverlay from "../Other/LoadingOverlay";

interface IOffer {
  setEditingOfferId: (id: string) => void;
  id: string;
  title: string;
  description: string;
  price: number;
  mileage: number;
  photos: string[];
}

const offerSchema = Yup.object().shape({
  description: Yup.string().required("Description is required").max(3000, "Description must be at most 3000 characters"),
  price: Yup.number().required("Price is required").min(1, "Price must be at least 1").integer("Price must be an integer"),
  mileage: Yup.number().required("Mileage is required").min(0, "Mileage must be at least 0").integer("Mileage must be an integer"),
  //photos: Yup.array().of(Yup.string().required("Photo is required")).min(1, "You must have at least one photo").max(10, "You can have at most 10 photos")
});

export default function EditOffer(props: IOffer) {
    const [activeInput, setActiveInput] = useState("description");
    const [tempPhotos, setTempPhotos] = useState<File[]>([]);
    const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
        id: props.id,
        description: props.description,
        price: props.price,
        mileage: props.mileage,
        photos: props.photos,
        },
        validationSchema: offerSchema,
        onSubmit: async (values) => {
        await handleSubmit();
        props.setEditingOfferId("");
        },
    });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await Promise.all(photosToDelete.map((photo) => removePhotoFromCloudinary(photo)));
            
            const nonEmptyTempPhotos = tempPhotos.filter(file => file instanceof File);
            const uploadedPhotoUrls = await Promise.all(
                nonEmptyTempPhotos.map(async (file) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
                    const response = await fetch(`${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                        method: "POST",
                        body: formData,
                    });
                    const data = await response.json();
                    return data.secure_url;
                })
            );

            const photos = formik.values.photos.filter(photo => photo !== "");
    
            const valuesWithPhotos = {
                ...formik.values,
                photos: [...photos, ...uploadedPhotoUrls],
            };
    
            await fetch(`${process.env.REACT_APP_CARS_EDIT_ENDPOINT}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify(valuesWithPhotos),
            });
    
            setTempPhotos([]);
        } catch (error) {
            console.error("Error:", error);
        }
        finally {
            setLoading(false);
        }
    };
    

    const handleAddPhoto = () => {
        if (formik.values.photos.length >= 10) {
            alert("You can have at most 10 photos");
            return;
        }
        formik.setFieldValue("photos", [...formik.values.photos, ""]);
    }


    const handleRemovePhoto = (index: number) => {
        const photos = formik.values.photos.filter((photo, i) => i !== index);
        const photoToDelete = formik.values.photos[index];
        formik.setFieldValue("photos", photos);
        if (photoToDelete !== "") {
            setPhotosToDelete((prevPhotos) => [...prevPhotos, photoToDelete]);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!file || !allowedFileTypes.includes(file.type)) {
            alert("Invalid file type. Please upload a JPEG or PNG image.");
            return;
        }
        if (file) {
          setTempPhotos((prevPhotos) => {
            const newPhotos = [...prevPhotos];
            newPhotos[index] = file;
            return newPhotos;
          });
        }
      };

    if (
        loading
      ) {
        return <LoadingOverlay />;
      }

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
        <p className="text-2xl font-semibold mb-4">{props.title}</p>
        <div className="flex mb-4 justify-between">
            <button
            type="button"
            id="description"
            onClick={() => setActiveInput("description")}
            className={`${
                activeInput === "description"
                ? "bg-teal-500 text-white"
                : "bg-gray-300 text-gray-700"
            } px-2 py-2 rounded`}
            >
            Description
            </button>
            <button
            type="button"
            id="price"
            onClick={() => setActiveInput("price")}
            className={`${
                activeInput === "price"
                ? "bg-teal-500 text-white"
                : "bg-gray-300 text-gray-700"
            } px-4 py-2 rounded`}
            >
            Price
            </button>
            <button
            type="button"
            id="mileage"
            onClick={() => setActiveInput("mileage")}
            className={`${
                activeInput === "mileage"
                ? "bg-teal-500 text-white"
                : "bg-gray-300 text-gray-700"
            } px-4 py-2 rounded`}
            >
            Mileage
            </button>
            <button
            type="button"
            id="photos"
            onClick={() => setActiveInput("photos")}
            className={`${
                activeInput === "photos"
                ? "bg-teal-500 text-white"
                : "bg-gray-300 text-gray-700"
            } px-4 py-2 rounded`}
            >
            Photos
            </button>
        </div>
        {activeInput === "description" && (
            <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600 font-semibold mb-2">
                Description
            </label>
            <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                className={`border px-4 py-2 w-full`}
                rows={5}
            />
            {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 mt-1">{formik.errors.description}</p>
            )}
            </div>
        )}
        {activeInput === "price" && (
            <div className="mb-4">
            <label htmlFor="price" className="block text-gray-600 font-semibold mb-2">
                Price
            </label>
            <input
                id="price"
                name="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                className={`border px-4 py-2 w-full`}
            />
            {formik.touched.price && formik.errors.price && (
                <p className="text-red-500 mt-1">{formik.errors.price}</p>
            )}
            </div>
        )}
        {activeInput === "mileage" && (
            <div className="mb-4">
            <label htmlFor="mileage" className="block text-gray-600 font-semibold mb-2">
                Mileage
            </label>
            <input
                id="mileage"
                name="mileage"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.mileage}
                className={`border px-4 py-2 w-full`}
            />
            {formik.touched.mileage && formik.errors.mileage && (
                <p className="text-red-500 mt-1">{formik.errors.mileage}</p>
            )}
            </div>
        )}
        {activeInput === "photos" && (
        <div className="mb-4">
          <label htmlFor="photos" className="block text-gray-600 font-semibold mb-2">
            Photos
          </label>
          {formik.values.photos.map((photo, index) => (
            <div key={index} className="flex items-center mb-2">
                {photo !== "" && (
              <img src={photo} alt={`Photo ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                )}
                {photo === "" && (
                    <input type="file" onChange={(event) => handleFileChange(event, index)} />
                )}
              <button type="button" onClick={() => handleRemovePhoto(index)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddPhoto} className="bg-teal-500 text-white px-4 py-2 rounded">
            Add Photo
          </button>
          {formik.touched.photos && formik.errors.photos && (
            <p className="text-red-500 mt-1">{formik.errors.photos}</p>
          )}
        </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
        </button>
        </form>
    );
}
