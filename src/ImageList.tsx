import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "./types";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const ImageList: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [displayMode, setDisplayMode] = useState<"one-column" | "two-columns">(
    "one-column",
  );
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<{ photos: Image[] }>(
          "https://api.slingacademy.com/v1/sample-data/photos",
        );
        setImages(response.data.photos);
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (image: Image) => {
    if (selectedImage?.id === image.id) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }
  };

  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === "one-column" ? "two-columns" : "one-column");
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  const handleDeleteImage = (imageId: number) => {
    setImages(prevImages => prevImages.filter(image => image.id !== imageId));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Image Viewer</h1>
      <button onClick={toggleDisplayMode}>
        {displayMode === "one-column"
          ? "Switch to Two Columns"
          : "Switch to One Column"}
      </button>
      <button onClick={handleLogout} style={{ margin: "20px" }}>
        Logout
      </button>
      {selectedImage ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={selectedImage.url}
            alt={selectedImage.title}
            style={{ width: "400px", height: "400px", objectFit: "cover" }}
            onClick={() => handleImageClick(selectedImage)}
          />
          <p>{selectedImage.description}</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", width: "500px" }}>
          {images.map((image) => (
            <div
              key={image.id}
              style={{
                margin: "10px",
                width:
                  displayMode === "one-column" ? "100%" : "calc(50% - 20px)",
                border: "1px solid"
              }}
            >
              <img
                src={image.url}
                alt={image.title}
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
                onClick={() => handleImageClick(image)}
              />
              <button onClick={() => handleDeleteImage(image.id)}>X</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};