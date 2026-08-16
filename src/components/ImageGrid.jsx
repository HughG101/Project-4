import ImageCard from "./ImageCard";

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