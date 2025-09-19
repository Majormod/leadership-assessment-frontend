// hooks/useImageDataURI.js
import { useState, useEffect } from 'react';

export const useImageDataURI = (imageUrl) => {
    const [dataURI, setDataURI] = useState('');

    useEffect(() => {
        let isMounted = true;
        const fetchImage = async () => {
            try {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onload = () => {
                    if (isMounted) {
                        setDataURI(reader.result);
                    }
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error("Error fetching image for PDF:", error);
            }
        };

        if (imageUrl) {
            fetchImage();
        }

        return () => { isMounted = false; };
    }, [imageUrl]);

    return dataURI;
};