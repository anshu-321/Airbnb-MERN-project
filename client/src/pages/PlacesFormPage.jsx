import { React, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";

function PlacesFormPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-sm text-gray-400">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addNewPlace(e) {
    e.preventDefault();
    const { data } = await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form on onSubmit={addNewPlace}>
        {preInput("Title", "Title of your place")}
        <input
          type="text"
          value={title}
          placeholder="Title, for example the best crash when new in town"
          onChange={(e) => setTitle(e.target.value)}
        />

        {preInput("Address", "Enter your proper address for easy arrival")}
        <input
          type="text"
          value={address}
          placeholder="address"
          onChange={(e) => setAddress(e.target.value)}
        />

        {preInput("Photos", "More the photos ,better the listing")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Describe the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {preInput("Perks", "Select all the perks of your place")}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput("Extra Info", "House rules,etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput(
          "Check In & Check Out times",
          "Add check in and check out time and Max guests below :"
        )}

        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="11"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max Guests</h3>
            <input
              type="number"
              placeholder="4"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button className="primary my-4">ADD</button>
        </div>
      </form>
    </div>
  );
}

export default PlacesFormPage;
