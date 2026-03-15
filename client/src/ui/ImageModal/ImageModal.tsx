import { CloseIcon } from "@/svg/CloseIcon";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface ImageModalProps {
  imageSrc: string | null;
  onClose: () => void;
  altText: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageSrc, altText, onClose }) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle drag start for both mouse and touch events
  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    setDragging(true);
    const clientX =
      e.type === "mousedown" ? (e as React.MouseEvent).clientX : (e as React.TouchEvent).touches[0].clientX;
    setStartX(clientX - position);
  };

  // Handle dragging for both mouse and touch events
  const onDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    if (dragging) {
      const clientX =
        e.type === "mousemove" ? (e as React.MouseEvent).clientX : (e as React.TouchEvent).touches[0].clientX;
      const newPosition = clientX - startX;
      setPosition(newPosition);
    }
  };

  // Handle drag end for both mouse and touch events
  const stopDrag = () => setDragging(false);

  useEffect(() => {
    if (!imageSrc) {
      setPosition(0);
    }
  }, [imageSrc]);

  if (!imageSrc) {
    return null;
  }

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      ref={overlayRef}
    >
      <div
        className={styles.closeIcon}
        onClick={onClose}
      >
        <CloseIcon />
      </div>
      <div className={styles.modalContent}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.dragOverlay}
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          // Handling touch events
          onTouchStart={startDrag}
          onTouchMove={onDrag}
          onTouchEnd={stopDrag}
          style={{ transform: `translateX(${position}px)` }}
        >
          <img
            src={imageSrc}
            alt={altText}
            className={styles.modalImage}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
