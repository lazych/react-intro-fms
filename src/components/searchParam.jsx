import { useContext, useState } from "react";
import useBreedList from "../custom hooks/useBreedList";
import Results from "./Results";
import fetchSearch from "../fetch/fetchSearch";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "../providers/adoptedPetContext";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    animal: "",
    location: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  const [adoptedPet, _] = useContext(AdoptedPetContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = {
      animal: formData.get("animal") ?? "",
      location: formData.get("location") ?? "",
      breed: formData.get("breed") ?? "",
    };

    setRequestParams(obj);
  };

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}
        <label htmlFor="location">
          location:
          <input name="location" id="location" placeholder="location" />
        </label>
        <label htmlFor="animal">
          animal:
          <select
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
            id="animal"
            name="animal"
          >
            <option />
            {ANIMALS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          breed:
          <select name="breed" id="breed" disabled={!breeds.length}>
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
