import React, { useState } from 'react'
import imageUpload from "../../assets/imageUpload.svg";
import * as S from "./ImageUpload.styles";

const ImageUpload = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);

  return (
    <S.DropArea
      isDragging={isDragging}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <S.Content>
        <img src={imageUpload} alt="Upload Icon" className="upload-icon" style={{marginBottom: "1rem"}}/>
        <p>Arraste seus documentos<br />para iniciar o upload</p>
      </S.Content>
      <S.FileInput type="file" multiple accept="image/*" />
    </S.DropArea>
  );
}

export default ImageUpload