import { CloseIcon } from "@/svg/CloseIcon";
import { StyledBox } from "@/ui/Box";
import React, { ReactNode, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface ImageModalProps {
  imageSrc: string;
  children: ReactNode;
  altText: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageSrc, altText, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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

  return (
    <>
      <StyledBox
        onClick={openModal}
        cursor={"zoom-in"}
      >
        {children}
      </StyledBox>

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
      )}
    </>
  );
};

export default ImageModal;
