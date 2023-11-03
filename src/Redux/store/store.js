import { configureStore } from '@reduxjs/toolkit';
import ImageGalleryPageReducer from '../features/ImageGalleryPage/ImageGalleryPageSlice';

export const store = configureStore({
    reducer: {
      ImageGalleryPage: ImageGalleryPageReducer 
    },
  
  });