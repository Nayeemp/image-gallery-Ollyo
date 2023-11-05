/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  reArrangeOnDrop, selectImage } from '../../Redux/features/ImageGalleryPage/ImageGalleryPageSlice';

function FeatureImage({imageDetails , index}) {
    // eslint-disable-next-line no-unused-vars
    const {id, isSelected, image} = imageDetails;
      
    const [isHovered, setIsHovered] = useState(false);  
    const [isDragging, setIsDragging] = useState(false);

    const dispatch = useDispatch();

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const onChangeHandler = (e)=>{
      dispatch(selectImage({id:id,isSelected: e.target.checked }))
    }

    const onDragStart = (e) => {
      e.dataTransfer.setData('imageIndex', index); // Set the image ID being dragged    
      setIsDragging(true);
    };

    const onDragEnd = () => {
        setIsDragging(false);
    };

    const onDragOver = (e) => {
      e.preventDefault(); // Allow the drop
  };

  const onDrop = (e) => {
      e.preventDefault();
      const droppedImageIndex = e.dataTransfer.getData('imageIndex');      
      dispatch(reArrangeOnDrop({droppedOnImageIndex: index, droppedImageIndex}))
  };



  

  

    return (
        <div className='col-span-2 row-span-2 border-gray-300 border rounded-md relative cursor-pointer image-transition' 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
        draggable="true"        
        >            
            <div><img src={image} alt="" className='w-full h-full object-cover rounded-md'/></div>

            {(isHovered || isSelected) && !isDragging && (<div className='absolute top-0 h-full w-full bg-black/10 hover:bg-black/40 z-1 rounded-md'>
                <input type='checkbox' checked={isSelected} onChange ={(e)=> onChangeHandler(e)} className='w-[20px] h-[20px] mt-5 ml-5'/>
            </div>)} 
        </div>
    );
}

export default FeatureImage;