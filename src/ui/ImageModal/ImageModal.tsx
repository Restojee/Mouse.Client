import { CloseIcon } from "@/svg/CloseIcon";
import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";

interface ImageModalProps {
  imageSrc: string;
  altText: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageSrc, altText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDragging(true);
    setStartX(e.clientX - position);
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dragging) {
      const newPosition = e.clientX - startX;
      setPosition(newPosition);
    }
  };

  const stopDrag = () => setDragging(false);

  return (
    <>
      <img
        src={imageSrc}
        alt={altText}
        onClick={openModal}
        className={styles.image}
      />

      {isOpen && (
        <div
          className={styles.modalOverlay}
          onClick={closeModal}
          ref={overlayRef}
        >
          <div
            className={styles.closeIcon}
            onClick={closeModal}
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
      )}
    </>
  );
};

export default ImageModal;
