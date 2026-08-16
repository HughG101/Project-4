function ImageCard({ image, isFavorite, onFavorite, onDetails }) {
  const breed = image.breeds?.[0];

  return (
    <article className="image-card">
      <button
        className="image-button"
        onClick={() => onDetails(image)}
        aria-label={`View details for ${breed?.name || "cat"}`}
      >
        <img
          src={image.url}
          alt={
            breed
              ? `${breed.name} cat`
              : "Cat from The Cat API"
          }
        />
      </button>

      <div className="card-info">
        <h2>{breed?.name || "Unknown Breed"}</h2>

        <button
          className="favorite-button"
          onClick={() => onFavorite(image)}
          aria-label={
            isFavorite
              ? `Remove ${breed?.name || "cat"} from favorites`
              : `Add ${breed?.name || "cat"} to favorites`
          }
        >
          {isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>
    </article>
  );
}

export default ImageCard;