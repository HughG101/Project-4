import { useEffect, useState } from "react";

import Banner from "./components/Banner";
import SearchBar from "./components/SearchBar";
import BreedSelect from "./components/BreedSelect";
import ImageGrid from "./components/ImageGrid";
import FavoritesBar from "./components/FavoritesBar";
import DetailsModal from "./components/DetailsModal";
import Pagination from "./components/Pagination";

import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [images, setImages] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");

  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [favorites, setFavorites] = useLocalStorage(
    "favorites",
    []
  );

  const apiKey = import.meta.env.VITE_CAT_API_KEY;

  async function fetchBreeds() {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/breeds",
        {
          headers: {
            "x-api-key": apiKey
          }
        }
      );

      if (!response.ok) {
        throw new Error("Could not load breeds.");
      }

      const data = await response.json();
      setBreeds(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchImages() {
    setLoading(true);
    setError("");

    try {
      let url =
        `https://api.thecatapi.com/v1/images/search` +
        `?limit=12&page=${page}&has_breeds=1`;

      if (selectedBreed) {
        url += `&breed_ids=${selectedBreed}`;
      }

      const response = await fetch(url, {
        headers: {
          "x-api-key": apiKey
        }
      });

      if (!response.ok) {
        throw new Error("Could not load cat images.");
      }

      const data = await response.json();

      setImages(data);
    } catch (err) {
      setError(err.message);
      setImages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    fetchImages();
  }, [selectedBreed, page]);

  function handleSearch() {
    const search = searchQuery.trim().toLowerCase();

    if (!search) {
      setSelectedBreed("");
      setPage(0);
      return;
    }

    const matchingBreed = breeds.find((breed) =>
      breed.name.toLowerCase().includes(search)
    );

    if (matchingBreed) {
      setSelectedBreed(matchingBreed.id);
      setPage(0);
      setError("");
    } else {
      setImages([]);
      setError("No matching breed was found.");
    }
  }

  function handleBreedChange(breedId) {
    setSelectedBreed(breedId);
    setSearchQuery("");
    setPage(0);
  }

  function toggleFavorite(image) {
    const alreadyFavorite = favorites.some(
      (favorite) => favorite.id === image.id
    );

    if (alreadyFavorite) {
      setFavorites(
        favorites.filter(
          (favorite) => favorite.id !== image.id
        )
      );
    } else {
      setFavorites([...favorites, image]);
    }
  }

  function retryFetch() {
    fetchBreeds();
    fetchImages();
  }

  return (
    <>
      <Banner />

      <main className="container">
        <section className="controls">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />

          <BreedSelect
            breeds={breeds}
            selectedBreed={selectedBreed}
            onBreedChange={handleBreedChange}
          />
        </section>

        <FavoritesBar
          favorites={favorites}
          onDetails={setSelectedImage}
        />

        {loading && (
          <p className="status-message">
            Loading cats...
          </p>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>

            <button onClick={retryFetch}>
              Retry
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          images.length === 0 && (
            <p className="status-message">
              No cat images found.
            </p>
          )}

        {!loading && !error && images.length > 0 && (
          <>
            <ImageGrid
              images={images}
              favorites={favorites}
              onFavorite={toggleFavorite}
              onDetails={setSelectedImage}
            />

            <Pagination
              page={page}
              onPrevious={() =>
                setPage((currentPage) =>
                  Math.max(currentPage - 1, 0)
                )
              }
              onNext={() =>
                setPage((currentPage) => currentPage + 1)
              }
            />
          </>
        )}
      </main>

      {selectedImage && (
        <DetailsModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}

export default App;