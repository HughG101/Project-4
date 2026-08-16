import { useEffect } from "react";

function DetailsModal({ image, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!image) {
    return null;
  }

  const breed = image.breeds?.[0];

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close details"
        >
          ×
        </button>

        <img
          src={image.url}
          alt={`${breed?.name || "Cat"} enlarged`}
        />

        <h2 id="modal-title">
          {breed?.name || "Unknown Breed"}
        </h2>

        {breed ? (
          <div className="breed-details">
            <p>
              <strong>Temperament:</strong>{" "}
              {breed.temperament || "Not available"}
            </p>

            <p>
              <strong>Origin:</strong>{" "}
              {breed.origin || "Not available"}
            </p>

            <p>
              <strong>Life Span:</strong>{" "}
              {breed.life_span || "Not available"} years
            </p>

            {breed.wikipedia_url && (
              <a
                href={breed.wikipedia_url}
                target="_blank"
                rel="noreferrer"
              >
                Learn more on Wikipedia
              </a>
            )}
          </div>
        ) : (
          <p>No breed information is available.</p>
        )}
      </div>
    </div>
  );
}

export default DetailsModal;