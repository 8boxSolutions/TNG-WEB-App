import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBranches } from "../../functions/Branches";
import { useSelector } from "react-redux";

export function TDMLocation({ setStep, location, setLocation }) {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState([]);
  const { user } = useSelector((state) => state.record);

  function handleBack() {
    navigate(-1);
  }

  function handleNext() {
    setStep(2);
  }

  async function handleLocation(e) {
    console.log(e);
  }

  useEffect(() => {
    getBranches(user.id, "f98233d6-e9eb-4ef6-ae94-e179f954e542")
      .then((response) => {
        if (response.valid) {
          // Convert the object into an array
          const locationArray = Object.values(response.data);
          setSelectedLocation(locationArray);
        } else {
          // Handle error case
        }
      })
      .catch((error) => {
        // Handle error case
      });
  }, []);

  console.log(selectedLocation);
  return (
    <div className="w-full h-[60vh] flex justify-center">
      <div className="w-[80vw] sm:w-[50vw]">
        <div className="h-1/2 text-center flex gap-6 flex-col justify-center items-center">
          <p className="text-[30px] text-[#FF98C3]">Select Location</p>
          <p className="text-sm">
            Please note that our TWO HOUR TOUR starts every 15 minutes.
            <br />
            Guests are required to come 20 minutes before their scheduled slot
            <br />
            for processing of tickets.
          </p>
        </div>

        <div className="h-1/2">
          <p>Choose where you want to book your appointment</p>
          {/* <select
    className={`border-2 p-2 rounded-md w-full cursor-pointer`}
    onChange={handleLocation}
    value={selectedLocation}
  >
    {selectedLocation.map((item) => (
      <option key={item.Address} value={item}>{item.Address}</option>
    ))}
  </select> */}

<select
    className={`border-2 p-2 rounded-md w-full cursor-pointer`}
    onChange={(e) => handleLocation(e)} // Bind the handleLocation function to onChange
  value={selectedLocation.Address} //
  >
    {selectedLocation.map((item, index) => (
      <option key={index} value={item.Address}>
        {item.Address}
      </option>
    ))}
  </select>

          <div className="flex justify-end gap-5">
            <button
              onClick={handleBack}
              className="shadow-md text-sm py-2 px-6 border-[#FF98C3] border-2 text-[#FF98C3]"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="shadow-md text-sm py-2 px-6 bg-[#FF98C3] text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
