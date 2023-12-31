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
    },
    {
        id : 2,
        isSelected : false,
        image: image2,
    },
    {
        id : 3,
        isSelected : false,
        image: image3,
    },
    {
        id : 4,
        isSelected : false,
        image: image4,
    },
    {
        id : 5,
        isSelected : false,
        image: image5,
    },
    {
        id : 6,
        isSelected : false,
        image: image6,
    },
    {
        id : 7,
        isSelected : false,
        image: image7,
    },
    {
        id : 8,
        isSelected : false,
        image: image8,
    },
    {
        id : 9,
        isSelected : false,
        image: image9,
    },
    {
        id : 10,
        isSelected : false,
        image: image10,
    },
    {
        id : 11,
        isSelected : false,
        image: image11,
    },
  ],
  draggingIndex: null,
  dragOverIndex: null,

  tampleteForTransition : [
    {
        index : 0,        
        position : {
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        index : 1,        
        position : {
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        index : 2,        
        position : {
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        index : 3,        
        position : {
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        index : 4,        
        position : {
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        index : 5,        
        position : {
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        index : 6,        
        position : {
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        index : 7,        
        position : {
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        index : 8,        
        position : {
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        index : 9,        
        position : {
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        index : 10,        
        position : {
            Xaxis:0,
            Yaxis:0
        }
    },
    {
        index : 11,        
        position : {
            Xaxis:0,
            Yaxis:0
        }
    },
  ]
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
        state.draggingIndex  = null;
        state.draggingIndex = null;
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

    addDraggingImageIndex: (state, action) =>{
        state.draggingIndex= action.payload;
    },

   addDragOverImageIndex: (state, action) =>{
        state.dragOverIndex= action.payload;
    },

    clearDragDropIndexs:  (state, action) =>{
        state.draggingIndex = null;
        state.dragOverIndex = null;
    }, 

    addTampletePosition:  (state, action) =>{
        // console.log("action.payload = ", action.payload  )
        state.tampleteForTransition  = state.tampleteForTransition.map((arrayItem)=>{
            if(arrayItem.index === action.payload.index){
                return {...arrayItem, position:{...arrayItem.position, Xaxis: action.payload.Xaxis, Yaxis: action.payload.Yaxis }}
            }
            return arrayItem;
        })
    }, 

  }
});

export default ImageGalleryPageSlice.reducer;
export const { selectImage , deleteSelectImage , reArrangeOnDrop, addDraggingImageIndex, addDragOverImageIndex, addTampletePosition, clearDragDropIndexs} = ImageGalleryPageSlice.actions;
