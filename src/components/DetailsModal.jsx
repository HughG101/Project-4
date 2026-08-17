// Displays an enlarged cat image and detailed information about the breed
import { useEffect } from "react";

function DetailsModal({ image, onClose }) {
    
    // Allows the modal to close when the escape key is pressed 
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    //removes the event listener when the modal closes
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

        // Prevents clicking inside the modal from closing it
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

        {/* Displays breed information if the API returns it */}
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