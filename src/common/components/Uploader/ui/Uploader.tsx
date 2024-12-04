import * as React from 'react';
import { Center, Paper, Text } from '@common/.';
import clsx from 'clsx';
import {
  type ImageFormPropsType,
  type UploaderChangeEventHandler,
  type UploaderDragEventHandler,
  type UploaderFileChangeEventHandler,
} from '@ui/Uploader/common/types';
import { inputAccept } from '@ui/Uploader/common/constants';
import styles from './Uploader.module.scss';

export const Uploader = (props: ImageFormPropsType) => {
  const { onImageUpload, className, name, image } = props;

  const inputFile = React.useRef<HTMLInputElement | null>(null);

  const handleClick = React.useCallback(() => {
    const inputElement = inputFile.current;
    inputElement?.click();
  }, [inputFile]);

  const uploadFile: UploaderFileChangeEventHandler = React.useCallback(
    (files) => {
      if (!files?.length) {
        return;
      }

      const [file] = files;
      onImageUpload(file);
    },
    [onImageUpload],
  );

  const uploadHandler: UploaderChangeEventHandler = React.useCallback(
    (event) => {
      const { files } = event.target;
      uploadFile(files);
    },
    [uploadFile],
  );

  // const handleDrag: UploaderDragEventHandler = React.useCallback((event) => {
  //   event.preventDefault();
  // }, []);
  //
  // const handleDragLeave: UploaderDragEventHandler = React.useCallback((event) => {
  //   event.preventDefault();
  // }, []);
  //
  // const handleDrop: UploaderDragEventHandler = React.useCallback((event) => {
  //   event.preventDefault();
  //   const { files } = event.dataTransfer;
  //   uploadFile(files);
  // }, []);

  return (
    <Paper
      className={clsx([className, styles])}
      onClick={handleClick}
      // onDragStart={handleDrag}
      // onDragLeave={handleDragLeave}
      // onDragOver={handleDrag}
      // onDrop={handleDrop}
      // backgroundImage={image}
    >
      <input
        accept={inputAccept.image}
        name={name}
        type="file"
        ref={inputFile}
        onChange={uploadHandler}
        style={{ display: 'none' }}
      />

      {!image && (
        <Center>
          <Text>Загрузите или перетащите изображение</Text>
        </Center>
      )}
    </Paper>
  );
};
