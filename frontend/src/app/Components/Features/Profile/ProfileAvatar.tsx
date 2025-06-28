"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { User, Camera, Upload, Loader2 } from 'lucide-react';

type ProfileAvatarProps = {
  profileImage: string;
  onImageChange: (image: string) => void;
  isEditing: boolean;
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ profileImage, onImageChange, isEditing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = useCallback((file: Blob) => {
    if (file && file.type.startsWith('image/')) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(() => {
          if (e.target) {
            if (typeof e.target.result === 'string') {
              onImageChange(e.target.result);
            }
          }
          setIsUploading(false);
        }, 1000); 
      };
      reader.readAsDataURL(file);
    }
  }, [onImageChange]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isEditing) setIsDragging(true);
  }, [isEditing]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (isEditing && files[0]) {
      handleFileSelect(files[0]);
    }
  }, [isEditing, handleFileSelect]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  return (
    <div className="relative group">
      <motion.div
        className={`relative w-32 h-32 rounded-full overflow-hidden border-4 transition-all duration-300 ${
          isDragging 
            ? 'border-light-secondary shadow-lg scale-105' 
            : 'border-white shadow-xl'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {profileImage ? (
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-light-accentSoft">
            <User size={48} className="text-light-accent" />
          </div>
        )}
        
        {/* Overlay de carga */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Loader2 className="animate-spin text-white" size={24} />
          </div>
        )}

        {/* Overlay de drag */}
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-light-secondary bg-light-secondary bg-opacity-10">
            <Upload className="text-light-secondary" size={24} />
          </div>
        )}
      </motion.div>

      {/* Botón de cámara para editar */}
      {isEditing && (
        <motion.label
          className="absolute -bottom-2 -right-2 p-2 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 bg-light-primary"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Camera className="text-white" size={16} />
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </motion.label>
      )}
    </div>
  );
};

export default ProfileAvatar;
