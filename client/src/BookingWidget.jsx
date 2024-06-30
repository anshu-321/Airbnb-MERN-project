import React from "react";

function BookingWidget({ place }) {
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
              <input type="date" />
            </div>
            <div className=" py-3 px-4 border-l">
              <label>Check-out : </label>
              <input type="date" />
            </div>
          </div>

          <div className="">
            <div className=" py-3 px-4 border-t">
              <label>Number of guests : </label>
              <input type="number" />
            </div>
          </div>
        </div>
        <button className="primary mt-4" value={1}>
          Book This Place
        </button>
      </div>
    </div>
  );
}

export default BookingWidget;
