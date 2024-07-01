import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";

function Placespage() {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div className="m-8">
      <AccountNav />
      {action !== "new" && (
        <div className="text-center">
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
            <Link
              to={"/account/places/" + place._id}
              className="mt-8 flex gap-4 cursor-pointer bg-gray-200 p-4 rounded-2xl "
            >
              <div className="flex w-32 h-32 bg-gray-300 ">
                <PlaceImg place={place} />
              </div>
              <div className="">
                <h2 className="text-xl ">{place.title}</h2>
                <p className="text-sm mt-2 ">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Placespage;
