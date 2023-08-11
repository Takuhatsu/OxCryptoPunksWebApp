import React, { useEffect, useState, useCallback } from "react";
import bundledData from "../bundledData.json";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CustomInput from "./CustomInput";
import CustomButton from './CustomButton';

const GalleryPage = () => {
  
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchKeywords, setSearchKeywords] = useState([]);
  const [filterKeywords, setFilterKeywords] = useState([]);

  const [searchInputValue, setSearchInputValue] = useState(''); // State to control the input value
  
  const pageSize = 20; // Number of images to fetch per batch

  const startIndex = currentPage * pageSize;

  const filteredImages = images.filter((image) => {
    if (searchKeywords.length === 0) {
      return true; // No filters applied, show all images
    }
  
    const nameKeywords = searchKeywords.filter(keyword => keyword);
  
    const numericMatch = nameKeywords.includes(
      image.name.split('#')[1]
    );
  
    const nameMatch = nameKeywords.some(nameKeyword =>
      image.name.toLowerCase() === nameKeyword.toLowerCase()
    );
  
    const attributesMatch = nameKeywords.every(nameKeyword =>
      image.attributes.some(
        attribute => attribute.value.toLowerCase() === nameKeyword.toLowerCase()
      )
    );
  
    return numericMatch || nameMatch || attributesMatch;
  });
  
  const fetchImages = useCallback(async () => {
    try {
      const allImages = await Promise.all(
        bundledData
          .sort((a, b) => {
            const indexA = parseInt(a.name.split('#')[1]);
            const indexB = parseInt(b.name.split('#')[1]);
            return indexA - indexB;
          })
          .map(async (data) => {
            const imageName = `${data.name.split('#')[1]}.png`
            const imageSource = `https://raw.githubusercontent.com/Takuhatsu/oxpunksgallery/main/punks/${imageName}`;
            const name = data.name;
            const attributes = data.attributes;
  
            return { imageSource, name, attributes };
          })
      );
  
      setImages(allImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const remainingImages =
      filteredImages.length - (currentPage + 1) * pageSize;
    setHasNextPage(remainingImages > 0);
  }, [currentPage, filteredImages]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInputValue(inputValue);
    const keywords = inputValue
      .split(", ")
      .filter((keyword) => keyword !== "");
  
    setFilterKeywords(keywords);
  };

  const handleSearchButtonClick = () => {
    setSearchKeywords(filterKeywords);
    setCurrentPage(0); // Reset current page to 0 when search is clicked
  };

  const onKeyDownHandler = (event) => {
    if (event.keyCode === 13) {
      // Enter key
      handleSearchButtonClick(); // Trigger the search function
    }
  };

  const handleResetFilters = () => {
    setFilterKeywords([]);
    setSearchKeywords([]);
    setCurrentPage(0); // Reset current page to 0 when filters are reset
    setSearchInputValue(''); // Clear the input value
  };

  const totalPages = Math.ceil(filteredImages.length / pageSize);
  const paginatedImages = filteredImages.slice(
    startIndex,
    startIndex + pageSize
  );

  const renderEmptySpaces = () => {
    const emptySpaceCount = pageSize - paginatedImages.length;

    if (emptySpaceCount <= 0) {
      return null; // Return null if there are no empty spaces to render
    }

    const emptySpaces = Array.from({ length: emptySpaceCount }).map(
      (_, index) => (
        <div className="image-item empty" key={`empty-${startIndex + index}`} />
      )
    );

    return <>{emptySpaces}</>;
  };

  return (
    <div className="App">
      <div className="search-bar">
        <div className='search-input'>
        <CustomInput
          // value={filterKeywords.join(',')} //If not removed, we can't type "," and spacebar in the search field
          value={searchInputValue} // Use the controlled input value
          onChange={handleSearchInputChange}
          label="Search by keywords"
          onKeyDown={onKeyDownHandler}
        />
        </div>
        <div className='search-button'>
        <CustomButton variant="contained" onClick={handleSearchButtonClick}>Search</CustomButton>
        </div>
        <div className='reset-button'>
        <CustomButton variant="contained" onClick={handleResetFilters}>Reset</CustomButton>
        </div>
        {/* <div className="reset-filters-icon" onClick={handleResetFilters}>
          <RestartAltIcon />
        </div> */}
      </div>
      <div className="gallery-container">
        {paginatedImages.map((image, index) => (
          <div className="image-item" key={`image-${startIndex + index}`}>
            <img
              className="image"
              src={image.imageSource}
              alt=""
              style={{
                width: "192px",
                height: "192px",
                backgroundColor: "#648595",
                imageRendering: "pixelated",
              }}
            />
            <div className="text-web">{image.name}</div>
          </div>
        ))}
        {renderEmptySpaces()}
      </div>
      <div className="pagination-buttons">
        <div
          onClick={currentPage !== 0 ? handlePreviousPage : null}
          className={`pagination-button ${currentPage === 0 ? "disabled" : ""}`}
          style={{ cursor: currentPage === 0 ? "not-allowed" : "pointer" }}
        >
          <ArrowCircleLeftIcon
           sx={{
            color: '#666666',
            opacity: currentPage === 0 ? 0.3 : 1, 

            ...(currentPage !== 0
              ? {
                  '&:hover': {
                    color: '#ea34b0',
                  },
                }
              : {}),
          }}
          />
        </div>
        <div
          onClick={currentPage !== totalPages - 1 ? handleNextPage : null}
          className={`pagination-button ${
            currentPage === totalPages - 1 ? "disabled" : ""
          }`}
          style={{
            cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer",
          }}
        >
          <ArrowCircleRightIcon
          sx={{
            color: '#666666',
            opacity: hasNextPage ? 1 : 0.3,
            pointerEvents: hasNextPage ? 'auto' : 'none',
            ...(hasNextPage
              ? {
                  '&:hover': {
                    color: '#ea34b0',
                  },
                }
              : {}),
          }}
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
