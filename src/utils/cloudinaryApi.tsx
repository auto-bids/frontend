const removePhotoFromCloudinary = async (photo: string) => {
    const sha1 = async (string: string) => {
        const buffer = new TextEncoder().encode(string);
        const hash = await crypto.subtle.digest("SHA-1", buffer);
        const hexCodes = [];
        const view = new DataView(hash);
        for (let i = 0; i < view.byteLength; i += 4) {
            const value = view.getUint32(i);
            const stringValue = value.toString(16);
            const padding = "00000000";
            const paddedValue = (padding + stringValue).slice(-padding.length);
            hexCodes.push(paddedValue);
        }
        return hexCodes.join("");
    };

    const timestamp = new Date().getTime();
    const publicId = photo.split("/").slice(-1)[0].split(".")[0];
    const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;

    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = await sha1(stringToSign);

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('signature', signature);
    if (apiKey) {
        formData.append('api_key', apiKey);
    }
    formData.append('timestamp', timestamp.toString());
    try {
        const response = await fetch(`${cloudName}/image/destroy`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log('Error deleting image');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
  
  export default removePhotoFromCloudinary;