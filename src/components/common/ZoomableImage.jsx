import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { PiMagnifyingGlassMinus, PiMagnifyingGlassPlus } from "react-icons/pi";

const ZoomableImage = (props) => {
  const { src, alt } = props;

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(3, prevScale + 0.2)); // Max zoom 3x
  };

  const handleZoomOut = () => {
    setScale((prevScale) => {
      const newScale = Math.max(1, prevScale - 0.2);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 }); // Reset position when fully zoomed out
      }
      return newScale;
    });
  };

  useEffect(() => {
    const image = imageRef.current;
    const container = containerRef.current;
    let startPos = { x: 0, y: 0 };
    let startDrag = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      if (scale > 1) {
        setIsDragging(true);
        startPos = { x: position.x, y: position.y };
        startDrag = { x: e.clientX, y: e.clientY };
        e.preventDefault();
      }
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const dx = e.clientX - startDrag.x;
      const dy = e.clientY - startDrag.y;

      // Calculate boundaries
      const maxX = (container.offsetWidth * (scale - 1)) / (2 * scale);
      const maxY = (container.offsetHeight * (scale - 1)) / (2 * scale);

      // Constrain movement within boundaries
      const newX = Math.min(Math.max(startPos.x + dx / scale, -maxX), maxX);
      const newY = Math.min(Math.max(startPos.y + dy / scale, -maxY), maxY);

      setPosition({
        x: newX,
        y: newY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (image) {
      image.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (image) {
        image.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [isDragging, scale, position]);

  return (
    <div className="flex justify-center w-full h-64 mt-2 mb-4 py-2 border-gray-50 border-2 bg-gray-50 rounded-2xl shadow">
      <div
        ref={containerRef}
        className="bg-white rounded-lg relative h-full w-[50%] border-2 border-gray-200"
        style={{ overflow: "hidden" }}
      >
        <div className="flex flex-col rounded-es-lg bg-[#f9fafb80] overflow-hidden absolute top-0 right-0 z-10">
          <button
            onClick={handleZoomIn}
            className="text-slate-900 opacity-90 hover:opacity-100 hover:bg-gray-50 duration-300 ease-in-out p-2 cursor-pointer"
          >
            <PiMagnifyingGlassPlus className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="text-slate-900 opacity-90 hover:opacity-100 hover:bg-gray-50 duration-300 ease-in-out p-2 cursor-pointer"
          >
            <PiMagnifyingGlassMinus className="w-5 h-5" />
          </button>
        </div>

        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="w-full h-full object-contain select-none"
          style={{
            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? "none" : "transform 0.2s ease-out",
            transformOrigin: "center",
            willChange: "transform",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};

ZoomableImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ZoomableImage;
