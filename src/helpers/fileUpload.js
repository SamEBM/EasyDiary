export const fileUpload = async(file) => {
    if (!file) throw new Error('File was not received');

    const cloudinaryURL = 'https://api.cloudinary.com/v1_1/drkopig72/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudinaryURL, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('File was not uploaded');
        const cloudResponse = await resp.json();

        return cloudResponse.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}