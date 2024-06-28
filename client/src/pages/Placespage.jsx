import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

function Placespage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

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

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-primary text-white py-2 px-4 rounded-full "
            to={"/account/places/new"}
          >
            + Add New Place
          </Link>
        </div>
      )}
      {action === "new" && (
        <form>
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
          <div className="flex gap-2">
            <input
              type="text"
              value={photoLink}
              placeholder={"Paste the image link here.."}
              onChange={(e) => setPhotoLink(e.target.value)}
            />
            <button
              onClick={addPhotoByLink}
              className="bg-slate-200 px-4 rounded-2xl"
            >
              Add Photo
            </button>
          </div>

          <div className="mt-2 grid grid-cols-3 md:grid:cols-4 lg:grid-cols-6 gap-2">
            {addedPhotos.length > 0 &&
              addedPhotos.map((link) => (
                <div>
                  <img
                    className="rounded-2xl"
                    src={"http://localhost:4000/uploads/" + link}
                  />
                </div>
              ))}

            <button className="border bg-transparent text-2xl flex justify-center rounded-2xl p-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
            </button>
          </div>

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
      )}
    </div>
  );
}

export default Placespage;
