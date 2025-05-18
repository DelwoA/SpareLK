import { useState } from "react";
import { ZoomIn } from "lucide-react";
import Model3D from "../items/Model3D";

interface ImageGalleryProps {
  mainImage: string;
  additionalImages?: string[];
  images360?: string[];
}

export function ImageGallery({
  mainImage,
  additionalImages = [],
  images360 = [],
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [show360, setShow360] = useState(false);
  const allImages = [mainImage, ...additionalImages].filter(Boolean);

  const has360View = images360 && images360.length > 0;

  return (
    <div className="space-y-4">
      <div className="relative bg-slate-50 rounded-xl border overflow-hidden aspect-square flex items-center justify-center">
        {show360 ? (
          <div className="w-full h-full">
            <Model3D />
          </div>
        ) : (
          <img
            src={selectedImage}
            alt="Product"
            className="max-h-full max-w-full object-contain"
          />
        )}

        {/* 3D View badge */}
        {has360View && (
          <button
            onClick={() => setShow360(!show360)}
            className="absolute top-4 left-4 z-10"
            aria-label={show360 ? "Switch to image view" : "Switch to 3D view"}
          >
            <div
              className={`font-medium text-xs px-3 py-1 rounded-full flex items-center ${
                show360
                  ? "bg-orange-500 text-white"
                  : "bg-slate-900/70 text-white"
              }`}
            >
              <div className="h-3 w-3 mr-1" />
              3D
            </div>
          </button>
        )}

        {/* Zoom button */}
        {!show360 && (
          <button
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Thumbnail images */}
      {allImages.length > 1 && !show360 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              className={`relative flex-shrink-0 w-20 h-20 border rounded-lg overflow-hidden bg-slate-50 ${
                selectedImage === image ? "ring-2 ring-orange-500" : ""
              }`}
              onClick={() => setSelectedImage(image)}
              aria-label={`View product image ${index + 1}`}
            >
              <img
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
