import { useState } from "react";
import ImageZoom from "./ImageZoom";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  return (
    <div className="images md:grid grid-cols-7 flex flex-col">
      <div className="flex md:flex-col overscroll-auto gap-2 col-span-2 justify-center">
        {images.map((image, index) => (
          <div key={index} className="image relative rounded-lg">
            <img
              onClick={() => setSelectedImage(index)}
              src={image}
              alt={image}
              className={`size-[70px] rounded-lg mb-3 p-1 cursor-pointer ${
                selectedImage === index
                  ? "border-[1px] border-primary"
                  : "border-[1px] border-purple-200"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="selected-image col-span-5">
        <div className="size-fit p-2 bg-[#313030]/10 dark:bg-[#313030] rounded-lg">
          <ImageZoom image={images[selectedImage]} />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
