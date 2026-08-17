// Displays the breed dropdown using the data from Cat API
function BreedSelect({ breeds, selectedBreed, onBreedChange }) {
  return (
    <div className="breed-select">
      <label htmlFor="breed">Choose a breed:</label>

      <select
        id="breed"
        value={selectedBreed}
        onChange={(event) => onBreedChange(event.target.value)}
      >
        <option value="">All Breeds</option>
        
        {/* Creates one option for every breed returned by Cat API*/}
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BreedSelect;