/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  addDragOverImageId, addPosition, reArrangeOnDrop, selectImage } from '../../Redux/features/ImageGalleryPage/ImageGalleryPageSlice';

function FeatureImage({imageDetails , index}) {
    // eslint-disable-next-line no-unused-vars
    const {id, isSelected, image, moveTo} = imageDetails;
    
    const { images } = useSelector((state)=> state.ImageGalleryPage);
    let targatedImage =  images.find((imageItem)=> imageItem.id === (id + 1));    
    const { draggingId, dragOverId } = useSelector((state)=> state.ImageGalleryPage);

    
  const componentRef = useRef(null);
      
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
      if(!dragOverId || (dragOverId !== id)){
        dispatch(addDragOverImageId(id));
      }
  };

  const onDrop = (e) => {
      e.preventDefault();
      const droppedImageIndex = e.dataTransfer.getData('imageIndex');      
      dispatch(reArrangeOnDrop({droppedOnImageIndex: index, droppedImageIndex}))
  };

  
useEffect(() => {
  const updatePosition = () => {
      if (componentRef.current) {
          const { x, y } = componentRef.current.getBoundingClientRect();
          // console.log(`Component at X: ${x}, Y: ${y}`);
          
          dispatch(addPosition({id: id, Xaxis:x, Yaxis:y}))
          
      }
  };

  // Call the updatePosition function on mount and screen resize
  updatePosition();
  window.addEventListener('resize', updatePosition);

  return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('resize', updatePosition);
  };
}, []);



      
  let transitionStyle = {transform: 'translateX(0px) translateY(0px)'};

  if((draggingId && dragOverId) && (draggingId !== dragOverId)){
    if(dragOverId <= id){
      if(targatedImage?.moveTo && moveTo){
        console.log("match", id)
        console.log(`${id} to ${index} = ${moveTo.Xaxis} to  ${targatedImage.moveTo.Xaxis }`)
        console.log(`${id} to ${index} = ${moveTo.Yaxis} to  ${targatedImage.moveTo.Yaxis }`)
  
          // transitionStyle = {transform: `translateX(200px)`, zIndex:"2"};
          if((targatedImage.moveTo.Xaxis - moveTo.Xaxis)>= 0){
            transitionStyle = {transform: `translateX(${targatedImage.moveTo.Xaxis - moveTo.Xaxis}px)`};
          }else{
            transitionStyle = {transform: `translateX(${targatedImage.moveTo.Xaxis - moveTo.Xaxis}px) translateY(${targatedImage.moveTo.Yaxis - moveTo.Yaxis}px)`};
          }
      }

    }else{
       transitionStyle = {transform: 'translateX(0px) translateY(0px)'};
    }
  }else{
     transitionStyle = {transform: 'translateX(0px) translateY(0px)'};
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
        >            
            <div className='col-span-2 row-span-2 border-gray-300 border rounded-md image-transition'  style={transitionStyle} ref={componentRef}>
              <img src={image} alt="" className='w-full h-full object-cover rounded-md'/>
              </div>

            {(isHovered || isSelected) && !isDragging && (<div className='absolute top-0 h-full w-full bg-black/10 hover:bg-black/40 z-1 rounded-md'>
                <input type='checkbox' checked={isSelected} onChange ={(e)=> onChangeHandler(e)} className='w-[20px] h-[20px] mt-5 ml-5'/>
            </div>)} 
        </div>
    );
}

export default FeatureImage;