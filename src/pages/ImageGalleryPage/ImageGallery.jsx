import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegularImage from '../../Components/ImageGalleryPage/RegularImage';
import FeatureImage from '../../Components/ImageGalleryPage/FeatureImage';
import { deleteSelectImage } from '../../Redux/features/ImageGalleryPage/ImageGalleryPageSlice';
import AddImage from '../../Components/ImageGalleryPage/AddImage';




function ImageGallery(props) {
    const { images } = useSelector((state)=> state.ImageGalleryPage);
    const [totalSelected, setTotalSelected] = useState(0);
    // console.log("images = ", images);

    useEffect(()=>{
        let res = images.reduce((previousResult, currentValue)  => {
            let incrementedBy = (currentValue.isSelected)? 1 : 0;
            // console.log("incrementedBy= ", incrementedBy);
            // console.log("previousResult = ", previousResult);
            // console.log("currentValue = ", currentValue);
            
            return previousResult + incrementedBy;
    
       }, 0);
    
    //    console.log("res =", res);
       setTotalSelected(res);

    },[images])

    // console.log("totalSelected = ", totalSelected);

    
  const dispatch = useDispatch();

    const deleteHandler = ()=>{
        dispatch(deleteSelectImage())
      }
        

    let title = null

    if(totalSelected === 0){
        title = <div className='text-2xl font-semibold px-5 py-4 w-full h-full flex items-center'>Gallery</div>
    }
    
    if(totalSelected === 1){
        title = (<div className='w-full h-full flex items-center px-5 py-4'>                    
        <div className='flex gap-3 justify-between w-full h-full'>
            <div className='flex gap-2 items-center'>
                <div className='flex h-full items-center'><input type='checkbox' defaultChecked={true} className='w-[20px] h-[20px]'/></div>
                <div className='text-xl font-semibold'>1 File Selected</div>
            </div>

            <div className='text-base text-red-500 font-medium hover:underline cursor-pointer' onClick={()=> deleteHandler()} >Delete file</div>
        </div>
    </div>)
    }

    if(totalSelected > 1){
        title = (<div className='w-full h-full flex items-center px-5 py-4'>                    
        <div className='flex gap-3 justify-between w-full h-full'>
            <div className='flex gap-2 items-center'>
                <div className='flex h-full items-center'><input type='checkbox' defaultChecked={true} className='w-[20px] h-[20px]'/></div>
                <div className='text-xl font-semibold'>{totalSelected} Files Selected</div>
            </div>

            <div className='text-base text-red-500 font-medium hover:underline cursor-pointer' onClick={()=> deleteHandler()} >Delete files</div>
        </div>
    </div>)
    }


   
    
    return (
        <div className='container mt-5'>
            <div className='bg-white rounded-md'>

                {title}
                
                <hr/>
                <div className='px-5 py-6'>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-3'>
                        {images.map((imageItem, index)=>{
                            if(index === 0){
                                return <FeatureImage key={index} imageDetails={imageItem} index={index} />
                            }
                            return <RegularImage key={index} imageDetails={imageItem} index={index} />
                        })}
                        <AddImage/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageGallery;