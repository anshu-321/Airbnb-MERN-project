import React from "react";
import { Link, useParams } from "react-router-dom";

function Placespage() {
  const { action } = useParams();

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
          <h2 className="text-2xl mt-4">Title</h2>
          <p className="text-sm text-gray-400">*Keep short and good</p>
          <input
            type="text"
            placeholder="Title, for example the best crash when new in town"
          />
          <h2 className="text-2xl mt-4">Address</h2>
          <input type="text" placeholder="address" />
          <h2 className="text-2xl mt-4">Photos</h2>
          <p className="text-sm text-gray-400">
            More the photos ,better the listing
          </p>
          <div className="flex gap-2">
            <input type="text" placeholder={"Paste the image link here.."} />
            <button className="bg-slate-200 px-4 rounded-2xl">Add Photo</button>
          </div>

          <div className="mt-2 grid grid-cols-3 md:grid:cols-4 lg:grid-cols-6">
            <button className="border bg-transparent text-2xl flex justify-center rounded-2xl p-4">
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
          <h2 className="text-2xl mt-4">Description</h2>
          <p className="text-sm text-gray-400">Describe the place</p>
          <textarea placeholder="Description about the place"></textarea>
          <h2 className="text-2xl mt-4">Perks</h2>
          <p className="text-sm text-gray-400">
            Select all the perks of your place
          </p>

          <div>
            <label>
              <input type="checkbox" />
              <span>WiFi</span>
            </label>
            <label>
              <input type="checkbox" />
              <span>Free Parking</span>
            </label>
            <label>
              <input type="checkbox" />
              <span>TV</span>
            </label>
            <label>
              <input type="checkbox" />
              <span>Pets Allowed</span>
            </label>
            <label>
              <input type="checkbox" />
              <span>Private Entrance</span>
            </label>
          </div>
        </form>
      )}
    </div>
  );
}

export default Placespage;
