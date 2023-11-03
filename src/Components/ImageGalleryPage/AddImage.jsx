import React, { useState } from 'react';

import imagePlaceHolder from '../../Assets/image_placeHolder.png';

function AddImage() {
    const [image, setImage] = useState('');

    console.log("image = ", image);

    return (
        <div className='border-gray-300 border border-dashed rounded-md'>
            <label className='w-full h-full flex justify-center items-center cursor-pointer'>
                <div className='flex flex-col items-center gap-2'>                    
                    <img src={imagePlaceHolder} alt="image_placeHolder" className="max-w-[35px] max-h-[35px] object-cover" />
                    <div className="text-base font-normal leading-[14.32px] flex justify-center">
                        {(image?.name) ? image.name : 'Add File'}
                    </div>
                </div>
             <input type="file" className="hidden" accept='.jpg, .png, .jpge, .webp'  onChange={(e) =>  setImage(e.target.files[0])}  />
            </label>
        </div>
    );
}

export default AddImage;