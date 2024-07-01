import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const data = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    };
    const response = await axios.post("/bookings", data);
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-center text-2xl">
          Price: {place.price}$ / <strong>per night</strong>
        </div>
        <div className="border rounded-2xl my-4">
          <div className="flex justify-between">
            <div className=" py-3 px-4 ">
              <label>Check-in : </label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className=" py-3 px-4 border-l">
              <label>Check-out : </label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>

          <div className="">
            <div className=" py-3 px-4 border-t">
              <label>Number of guests : </label>
              <input
                type="number"
                value={numberOfGuests}
                onChange={(ev) => setNumberOfGuests(ev.target.value)}
              />
            </div>
          </div>
          {numberOfNights > 0 && (
            <div>
              <div className="py-3 px-4 border-t">
                <label>Full Name : </label>
                <input
                  type="text"
                  placeholder="Anshu Kar"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
              </div>
              <div className="py-3 px-4 border-t">
                <label>Phone Number : </label>
                <input
                  type="tel"
                  placeholder="8782828xxx"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        <button onClick={bookThisPlace} className="primary mt-4" value={1}>
          {numberOfNights <= 0 && <span>Book This Place</span>}
          {numberOfNights > 0 && (
            <strong>{"-> " + numberOfNights * place.price}</strong>
          )}
        </button>
      </div>
    </div>
  );
}

export default BookingWidget;
