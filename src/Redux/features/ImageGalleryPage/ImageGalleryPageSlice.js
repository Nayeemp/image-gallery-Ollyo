/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import { imagesData } from './imagesData';
import image1 from "../../../Assets/ImageGalleryPage/image-1.webp";
import image2 from "../../../Assets/ImageGalleryPage/image-2.webp";
import image3 from "../../../Assets/ImageGalleryPage/image-3.webp";
import image4 from "../../../Assets/ImageGalleryPage/image-4.webp";
import image5 from "../../../Assets/ImageGalleryPage/image-5.webp";
import image6 from "../../../Assets/ImageGalleryPage/image-6.webp";
import image7 from "../../../Assets/ImageGalleryPage/image-7.webp";
import image8 from "../../../Assets/ImageGalleryPage/image-8.webp";
import image9 from "../../../Assets/ImageGalleryPage/image-9.webp";
import image10 from "../../../Assets/ImageGalleryPage/image-10.jpeg";
import image11 from "../../../Assets/ImageGalleryPage/image-11.jpeg";

const initialState = {
  images:[
    {
        id : 1,
        isSelected : false,
        image: image1,
        moveTo :{
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        id : 2,
        isSelected : false,
        image: image2,
        moveTo :{
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        id : 3,
        isSelected : false,
        image: image3,
        moveTo :{
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        id : 4,
        isSelected : false,
        image: image4,
        moveTo :{
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        id : 5,
        isSelected : false,
        image: image5,
        moveTo :{
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        id : 6,
        isSelected : false,
        image: image6,
        moveTo :{
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        id : 7,
        isSelected : false,
        image: image7,
        moveTo :{
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        id : 8,
        isSelected : false,
        image: image8,
        moveTo :{
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        id : 9,
        isSelected : false,
        image: image9,
        moveTo :{
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        id : 10,
        isSelected : false,
        image: image10,
        moveTo :{
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        id : 11,
        isSelected : false,
        image: image11,
        moveTo :{
            Xaxis:0,
            Yaxis:0
        }
    },
  ],
  draggingId: null,
  dragOverId: null
};

// const initialState = {
//   images : imagesData
// }

export const ImageGalleryPageSlice = createSlice({
  name: 'ImageGalleryPage',
  initialState,
  reducers: {
    selectImage: (state, action) => {
        // console.log("id ", action.payload.id );
        // console.log("isSelected ", action.payload.isSelected );
        state.images = state.images.map((item)=>{
            if(item.id === action.payload.id){
                return {...item, isSelected :  action.payload.isSelected }
            }

            return item;
        })
    //   state.tags = [];
    },

    deleteSelectImage : (state) =>{
        state.images = state.images.filter((item)=> item.isSelected !== true);
    },

    reArrangeOnDrop : (state, action) =>{
        state.draggingId = null;
        state.dragOverId = null;
        // console.log("droppedOnImageIndex", action.payload.droppedOnImageIndex);
        // console.log("droppedImageIndex", action.payload.droppedImageIndex);

        if(action.payload.droppedOnImageIndex !== action.payload.droppedImageIndex){
            let temp = {...state.images[action.payload.droppedImageIndex]};
            // console.log("droppedImage details = ", temp);
            state.images.splice(action.payload.droppedImageIndex, 1);
            state.images.splice(action.payload.droppedOnImageIndex, 0, temp);



            // let draftArray = [...state.images];
            // console.log("draftArray = ", draftArray);
            // let arrayAfterDeleteOperation = [...state.images].splice(action.payload.droppedImageIndex, 1)
            // console.log("arrayAfterDeleteOperation  = ", arrayAfterDeleteOperation );
            // state.images =  arrayAfterDeleteOperation;          
            
        }
    },

    addDraggingImageId: (state, action) =>{
        state.draggingId= action.payload;
    },

    addDragOverImageId: (state, action) =>{
        state.dragOverId= action.payload;
    },

    clearDragDropIds:  (state, action) =>{
        state.draggingId = null;
        state.dragOverId = null;
    }, 

    addPosition:  (state, action) =>{
        state.images = state.images.map((arrayItem)=>{
            if(arrayItem.id === action.payload.id){
                return {...arrayItem, moveTo:{...arrayItem.moveTo, Xaxis: action.payload.Xaxis, Yaxis: action.payload.Yaxis }}
            }
            return arrayItem;
        })
    }, 

  }
});

export default ImageGalleryPageSlice.reducer;
export const { selectImage , deleteSelectImage , reArrangeOnDrop, addDraggingImageId, addDragOverImageId, addPosition} = ImageGalleryPageSlice.actions;
