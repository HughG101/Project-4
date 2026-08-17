//Displays all the cats the user has saved as a favorite
function FavoritesBar({ favorites, onDetails }) {
  return (
    <section className="favorites">
      <h2>My Favorites</h2>

        {/* Shows a message when the favorites are empty */}
      {favorites.length === 0 ? (
        <p>You haven't saved any favorite cats yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((favorite) => (
            <button
              key={favorite.id}
              className="favorite-thumbnail"
              onClick={() => onDetails(favorite)}
              aria-label="View favorite cat details"
            >
              <img
                src={favorite.url}
                alt={`${favorite.breeds?.[0]?.name || "Favorite"} cat`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoritesBar;