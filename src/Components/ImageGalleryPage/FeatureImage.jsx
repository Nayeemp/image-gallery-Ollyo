/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  addDragOverImageIndex, addDraggingImageIndex, addTampletePosition, clearDragDropIndexs, reArrangeOnDrop, selectImage } from '../../Redux/features/ImageGalleryPage/ImageGalleryPageSlice';

function FeatureImage({imageDetails , index}) {
    // eslint-disable-next-line no-unused-vars
    const {id, isSelected, image } = imageDetails;
    
   
    const { draggingIndex, dragOverIndex } = useSelector((state)=> state.ImageGalleryPage);
    
  const [isHovered, setIsHovered] = useState(false);  
  const [isDragging, setIsDragging] = useState(false);


  const componentRef = useRef(null);

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
    e.dataTransfer.setData('imageIndex', index);    
    setIsDragging(true);
    dispatch(addDraggingImageIndex(index)); 
  };

  const onDragEnd = () => {
      setIsDragging(false);
      dispatch(clearDragDropIndexs());
  };

  const onDragOver = (e) => {
    e.preventDefault(); // Allow the drop    
    // console.log("DragOver index = ", index);
    if((dragOverIndex !== index) && (draggingIndex !== index) ){
      dispatch(addDragOverImageIndex(index));
    }
    // setAddTransition("translate-x-[200px]");
};

const onDrop = (e) => {
    e.preventDefault();
    const droppedImageIndex = e.dataTransfer.getData('imageIndex');    
    dispatch(reArrangeOnDrop({droppedOnImageIndex: index, droppedImageIndex}));    
    // setAddTransition("translate-x-0");
};


useEffect(() => {
  const updatePosition = () => {
      if (componentRef.current) {
          const { x, y } = componentRef.current.getBoundingClientRect();
          // console.log(`Component at X: ${x}, Y: ${y}`);
          
          dispatch(addTampletePosition({index: index, Xaxis:x, Yaxis:y}));
          
      }
  };

  // Call the updatePosition function on mount and screen resize
  updatePosition();
  window.addEventListener('resize', updatePosition);

  return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('resize', updatePosition);
  };
}, [draggingIndex]);

const { tampleteForTransition } = useSelector((state)=> state.ImageGalleryPage);

const {position : ownPosition} = tampleteForTransition[index];

const {position : targetPosition} = tampleteForTransition[index+1];

// console.log("ownPosition = ", ownPosition)
// console.log("targetPosition = ", targetPosition)

let transitionStyle = {transform: 'translateX(0px) translateY(0px)'};
if(draggingIndex === null){
  transitionStyle = {transform: 'translateX(0px) translateY(0px)'};
}

if((draggingIndex && dragOverIndex) && (draggingIndex !== dragOverIndex)){
  if(dragOverIndex <= index){
    if((targetPosition.Xaxis - ownPosition.Xaxis)> 0){
      transitionStyle = {transform: `translateX(${targetPosition.Xaxis -ownPosition.Xaxis}px)`};
    }else if(targetPosition.Xaxis !== 0){
      transitionStyle = {transform: `translateX(${targetPosition.Xaxis -ownPosition.Xaxis}px) translateY(${targetPosition.Yaxis - ownPosition.Yaxis}px)`};
    }
  }
}



    return (
        <div className='col-span-2 row-span-2 border-gray-300 border rounded-md relative cursor-pointer' 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
        draggable="true"
        ref={componentRef}         
        >            
            <div className='col-span-2 row-span-2 border-gray-300 border rounded-md image-transition' style={transitionStyle}>
               <div className='relative'>
                    <img src={image} alt="" className='w-full h-full object-cover rounded-md'/>
              </div>

              </div>

            {(isHovered || isSelected) && !isDragging && (<div className='absolute top-0 h-full w-full bg-black/10 hover:bg-black/40 z-1 rounded-md'>
                <input type='checkbox' checked={isSelected} onChange ={(e)=> onChangeHandler(e)} className='w-[20px] h-[20px] mt-5 ml-5'/>
            </div>)} 
        </div>
    );
}

export default FeatureImage;