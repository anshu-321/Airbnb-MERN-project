import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";

function Placespage() {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      {action !== "new" && (
        <div className="text-center">
          list of all added places
          <br />
          <Link
            className="bg-primary text-white py-2 px-4 rounded-full "
            to={"/account/places/new"}
          >
            + Add New Place
          </Link>
        </div>
      )}
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <div className="flex gap-4 bg-gray-200 p-4 rounded-2xl">
              <div className="h-32 w-32 bg-gray-300">
                {place.photos.length > 0 && (
                  <img src={place.photos[0]} alt="">
                    {" "}
                  </img>
                )}
              </div>
              <h2 className="text-xl ">{place.title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Placespage;
