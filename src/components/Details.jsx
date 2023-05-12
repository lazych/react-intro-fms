import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../fetch/fetchPet";
import Carousel from "./Carousel";
import { useState, useContext } from "react";
import Modal from "../modals/Modal";
import ErrorBoundary from "../Boundary/ErrorBoundary";
import AdoptedPetContext from "../providers/adoptedPetContext";

const Details = () => {
  const { id } = useParams();
  const result = useQuery(["details", id], fetchPet);
  const navigate = useNavigate();
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const [showModal, SetShowModal] = useState(false);

  const handleAdobtOption = () => {
    SetShowModal(true);
  };

  if (result.isLoading) {
    return (
      <div className={`loading-pane`}>
        <h2 className={`loader`}>🌀</h2>
      </div>
    );
  }

  const pet = result.data.pets[0];

  const handleAdobtOptionConfirm = () => {
    setAdoptedPet(pet);
    navigate("/");
  };

  return (
    <div className={`details`}>
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
        </h2>
        <button onClick={handleAdobtOption}>Adopt {pet.name}</button>
        <p>{pet.description} </p>
        //rendring modal
        {showModal ? (
          <Modal>
            <div>
              <h1>would you like to adobt {pet.name}?</h1>
              <div className="buttons">
                <button onClick={() => handleAdobtOptionConfirm()}>Yes</button>
                <button onClick={() => SetShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
