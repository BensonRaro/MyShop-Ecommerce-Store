import { useState } from "react";

const ImageZoom = ({ image }: { image: string }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = (
      e.target as HTMLDivElement
    ).getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setBackgroundPosition("50% 50%"); //reset position on mouse leave
      }}
      onMouseMove={handleMouseMove}
      className="size-[450px] overflow-hidden bg-no-repeat rounded-lg hover:cursor-zoom-in"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: isHovering ? "200%" : "100%",
        backgroundPosition,
        transition:
          "background-size 0.3s ease-in-out, background-position 0.3s ease-in-out",
      }}
    />
  );
};

export default ImageZoom;
