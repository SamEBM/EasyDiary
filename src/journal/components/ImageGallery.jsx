import * as React from 'react';
import {ImageList, ImageListItem} from '@mui/material';

export const ImageGallery = ({images = []}) => {
    return (
        <ImageList sx={{ width: '100%', height: 250 }} cols={4} rowHeight={200}>
        {images.map((image) => (
            <ImageListItem key={image} className='animate__animated animate__fadeInLeft'>
                <img
                    src={`${image}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt="Note image"
                    loading="lazy"
                />
            </ImageListItem>
        ))}
        </ImageList>
    );
}