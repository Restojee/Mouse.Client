import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { closePreviewImageThunk, selectPreviewImageSrc } from "@/modules/map/containers/map-content/slice";
import { CloseIcon } from "@/svg/CloseIcon";
import { ResetIcon } from "@/svg/ResetIcon";
import { ZoomInIcon } from "@/svg/ZoomInIcon";
import { ZoomOutIcon } from "@/svg/ZoomOutIcon";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ImageModal.module.scss";
import { useZindexContext } from "@/hooks/useZindexContext";

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const SCALE_STEP = 0.25;
const WHEEL_STEP = 0.0015;

type Point = { x: number; y: number };

const ImageModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const imageSrc = useAppSelector(selectPreviewImageSrc);
  const zIndex = useZindexContext();
  const [scale, setScale] = useState(MIN_SCALE);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<Point>({ x: 0, y: 0 });
  const offsetStart = useRef<Point>({ x: 0, y: 0 });

  const reset = useCallback(() => {
    setScale(MIN_SCALE);
    setOffset({ x: 0, y: 0 });
  }, []);

  const onClose = useCallback(() => {
    dispatch(closePreviewImageThunk());
  }, [dispatch]);

  const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

  const zoomIn = useCallback(() => setScale((s) => clampScale(s + SCALE_STEP)), []);
  const zoomOut = useCallback(() => {
    setScale((s) => {
      const next = clampScale(s - SCALE_STEP);
      if (next === MIN_SCALE) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  useEffect(() => {
    if (!imageSrc) reset();
  }, [imageSrc, reset]);

  useEffect(() => {
    if (!imageSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "+" || e.key === "=") zoomIn();
      else if (e.key === "-") zoomOut();
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [imageSrc, onClose, zoomIn, zoomOut, reset]);

  const getPoint = (e: React.MouseEvent | React.TouchEvent): Point => {
    if ("touches" in e) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };

  const startDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (scale === MIN_SCALE) return;
    setDragging(true);
    dragStart.current = getPoint(e);
    offsetStart.current = offset;
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const p = getPoint(e);
    setOffset({
      x: offsetStart.current.x + (p.x - dragStart.current.x),
      y: offsetStart.current.y + (p.y - dragStart.current.y),
    });
  };

  const stopDrag = () => setDragging(false);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setScale((s) => {
      const next = clampScale(s - e.deltaY * WHEEL_STEP);
      if (next === MIN_SCALE) setOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const onImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale === MIN_SCALE) zoomIn();
  };

  if (!imageSrc) return null;

  const canPan = scale > MIN_SCALE;

  return (
    <div
      style={{ zIndex: zIndex + 100 }}
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        className={styles.closeIcon}
        onClick={onClose}
      >
        <CloseIcon />
      </div>

      <div
        className={styles.controls}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.controlButton}
          onClick={zoomOut}
          disabled={scale <= MIN_SCALE}
          aria-label="Zoom out"
        >
          <ZoomOutIcon />
        </button>
        <div className={styles.scaleLabel}>{Math.round(scale * 100)}%</div>
        <button
          type="button"
          className={styles.controlButton}
          onClick={zoomIn}
          disabled={scale >= MAX_SCALE}
          aria-label="Zoom in"
        >
          <ZoomInIcon />
        </button>
        <button
          type="button"
          className={styles.controlButton}
          onClick={reset}
          disabled={scale === MIN_SCALE && offset.x === 0 && offset.y === 0}
          aria-label="Reset"
        >
          <ResetIcon />
        </button>
      </div>

      <div
        className={styles.stage}
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={startDrag}
        onTouchMove={onDrag}
        onTouchEnd={stopDrag}
        data-dragging={dragging || undefined}
        data-pannable={canPan || undefined}
      >
        <img
          src={imageSrc}
          alt="preview"
          className={styles.modalImage}
          draggable={false}
          onClick={onImageClick}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          }}
        />
      </div>
    </div>
  );
};

export default ImageModal;
