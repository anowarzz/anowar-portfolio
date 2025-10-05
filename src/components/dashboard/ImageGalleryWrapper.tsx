"use client";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface ImageGalleryWrapperProps {
  images: string[];
  projectTitle: string;
}

const ImageGalleryWrapper = ({
  images,
  projectTitle,
}: ImageGalleryWrapperProps) => {
  return (
    <ImageGallery
      items={images.map((image, index) => ({
        original: image,
        thumbnail: image,
        originalAlt: `${projectTitle} - Image ${index + 1}`,
        thumbnailAlt: `${projectTitle} - Thumbnail ${index + 1}`,
        originalClass: "rounded-2xl",
        thumbnailClass: "rounded-lg",
      }))}
      showPlayButton={false}
      showFullscreenButton={true}
      showIndex={true}
      showNav={false}
      slideDuration={300}
      slideInterval={3000}
      thumbnailPosition="bottom"
      useBrowserFullscreen={false}
      additionalClass="custom-gallery"
    />
  );
};

export default ImageGalleryWrapper;
