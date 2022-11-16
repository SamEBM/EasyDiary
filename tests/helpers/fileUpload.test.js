import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'drkopig72',
    api_key: '451446885693625',
    api_secret: 'bxH-7REv09prD8OqIV82bOetxoY',
    secure: true
});

describe('Pruebas en FileUpload', () => {
    test('Debe subir el archivo correctamente a Cloudinary', async() => { 
        const imgURL = 'https://flxt.tmsimg.com/assets/p10701949_b_v8_ah.jpg';
        const resp = await fetch(imgURL);
        const blob = await resp.blob();
        const file = new File([blob], 'snk.jpg');
        const url = await fileUpload(file);
        
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');

        await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
        });
    });


    test('debe retornar null', async() => { 
        const file = new File([], 'snk.jpg');
        const url = await fileUpload(file);
        
        expect(url).toBe(null);
    });
});