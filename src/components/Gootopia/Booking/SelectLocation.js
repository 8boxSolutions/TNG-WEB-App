import React, { useState } from "react";
import dripping from "../../../assets/Gootopia/Obstacles/SlimeDown.png";
import abouts from "../../../assets/Gootopia/FAQ's/about.png";
import GootopiaContainer from "../../Container/GootopiaContainter";
import moa from "../../../assets/Gootopia/Booking/SmMoa.png";
import routes from "../../../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { getBranches } from "../../../functions/Branches";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import TISContainer from "../../Container/TISContainer";

export default function SelectLocation({ step, setStep, setLocation, location, navigateToNextStep }) {
  const [branch, setBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(false);
  const { user } = useSelector((state) => state.record);
  const navigate = useNavigate();

  function handleBack() {
    navigate(routes.LandingGootopia);
  }

  function handleProceed() {
    navigateToNextStep()
  }

  const handleSelectBranch = (data) => {
    if (selectedBranch !== data.id) {
      setSelectedBranch(data.id);
      setLocation(data.id);
    }
  };

  useEffect(() => {
    getBranches(user?.id || '123', process.env.REACT_APP_GOOTOPIA_KEY)
      .then((response) => {
        if (response.valid) {
          // const locationArray = Object.values(response.data);
          // setSelectedLocation(locationArray);
          setBranch(response.data);
        } else {
        }
      })
      .catch();
  }, []);

  return (
    <GootopiaContainer>
      <div className="max-h-full min-h-screen bg-gootopia-purp ">
        <img class="w-full" src={dripping} alt="gootopialanding" />
        <div className="flex flex-row justify-center">
          <span className="font-flavors text-gootopia-pinkText text-[23px]  tablet:text-[50px] tablet:laptop:LaptopL:Laptop4k my-8">
            SELECT A LOCATION
          </span>
        </div>

        <div className="flex flex-row justify-center ">
          <div className="bg-white w-[300px] tablet:w-[400px] rounded-md p-3 ">
            <div>
              <div className="flex flex-row">
              {branch.map((data, index) => (
              <div className="flex flex-col mr-3 hoverEffects " key={index}>
                <button
                  className={`outline-4 self-center  ${
                    selectedBranch === data.id ? 'outline-[15px] outline-[#E677AA]' : ''
                  }`}
                  onClick={() => handleSelectBranch(data)}
                >
                  <img
                    className={`rounded-[7px] w-[75px] h-[75px] tablet:w-[120px] tablet:h-[120px] ${
                      selectedBranch === data.id ? 'outline outline-[#E677AA]' : ''
                    }`}
                    src={data?.Image}
                    alt="gootopia"
                  />
                </button>
                <div className="text-[#CA1D6D] text-[12px] tablet:text-[14px] font-poppins font-bold self-center mt-1">
                  {data?.Address}
                </div>
              </div>
            ))}
              </div>

              <div className="flex flex-row justify-end">
                <div>
                  <button
                    onClick={() => handleBack()}
                    className=" cursor-default text-[12px] tablet:text-[14px] text-[#E677AA] bg-[white] font-poppins px-3 py-1 rounded-3xl"
                  >
                    Back
                  </button>
                  {selectedBranch ? (
                    <button
                      onClick={() => handleProceed()}
                      className="ml-3 text-white text-[12px] tablet:text-[14px] bg-[#E677AA] font-poppins px-3 py-1 rounded-3xl"
                    >
                      Next
                    </button>
                  ) : (
                    <button className="ml-3 text-white cursor-default text-[12px] tablet:text-[14px] bg-[#777777] font-poppins px-3 py-1 rounded-3xl">
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-80">
          <img
            class="w-full rotate-180 "
            src={dripping}
            alt="gootopialanding "
          />
        </div>
      </div>
    </GootopiaContainer>
  );
}
