import ImageCard from "./ImageCard";

// Creates the grid of cat images 
function ImageGrid({
  images,
  favorites,
  onFavorite,
  onDetails
}) {
  return (
    <section className="image-grid">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}

          //Checks if the image is already in the favorites
          isFavorite={favorites.some(
            (favorite) => favorite.id === image.id
          )}
          onFavorite={onFavorite}
          onDetails={onDetails}
        />
      ))}
    </section>
  );
}

export default ImageGrid;