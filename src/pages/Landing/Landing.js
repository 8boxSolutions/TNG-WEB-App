import React from "react";
import { useState } from "react";
import { Topbar } from "../../components/Navbar";
import TNGLOGOWHITE from "../../assets/TNGLOGOWHITE.webp";
import OURBRANDS from "../../assets/OURBRANDS.png";
import TDM_Logo01 from "../../assets/TDM_Logo01.png";
import inflatableIsland from "../../assets/inflatableIsland.webp";
import gootopia from "../../assets/gootopia.webp";
import pink from "../../assets/pink.webp";
import TDM1 from "../../assets/Landing/TNG-Booking-TDM-1.jpg";
import TDM2 from "../../assets/Landing/TNG-Booking-TDM-2.jpg";

import TRF1 from "../../assets/Landing/TNG-Booking-TFR-1.jpg";
import TRF2 from "../../assets/Landing/TNG-Booking-TFR-2.jpg";

import BAKE1 from "../../assets/Landing/TNG-Booking-BAKEBE-1.jpg";
import BAKE2 from "../../assets/Landing/TNG-Booking-BAKEBE-2.jpg";

import IISBC1 from "../../assets/Landing/TNG-Booking-IISBC-1.jpg";
import IISBC2 from "../../assets/Landing/TNG-Booking-IISBC-2.jpg";

import GOO1 from "../../assets/Landing/TNG-Booking-GOOTOPIA-1.jpg";
import GOO2 from "../../assets/Landing/TNG-Booking-GOOTOPIA-2.jpg";

import ASSEENON from "../../assets/Landing/ASSEENON.png";

import routes from "../../constants/routes";
import booknow from "../../assets/TFR/button BOOK NOW GAMES.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BusinessUnits = [
  { id: 1, image: TRF1, link: `/` },
  { id: 2, image: TRF2, link: `/` },
  { id: 3, image: TDM1, link: routes.DessertBooking },
  { id: 4, image: TDM2, link: routes.DessertBooking },
  { id: 5, image: BAKE1, link: routes.BookingBakebe },
  { id: 6, image: BAKE2, link: routes.BookingBakebe },
  { id: 7, image: IISBC1, link: routes.BookingInflatable },
  { id: 8, image: IISBC2, link: routes.BookingInflatable },
  { id: 9, image: GOO1, link: routes.BookingGootopia },
  { id: 10, image: GOO2, link: routes.BookingGootopia },
];

export default function Landing() {
  const { user } = useSelector((state) => state.record);

  const [showMenu, setShowMenu] = useState(false);
  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <Topbar
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        handleMenuClick={handleMenuClick}
      />

      <div className="h-full p-8 mb-auto font-poppins landinggradient">
        <div className="flex flex-col justify-center items-center tablet:gap-4">
          <div className="w-[80%] tablet:w-[500px]">
            <img src={TNGLOGOWHITE} alt="Main Logo" />
          </div>
          <div className="w-[80%] tablet:w-[500px]">
            <img src={OURBRANDS} alt="Main Logo" />
          </div>

          <div className="flex flex-row justify-center items-center flex-wrap">
            <div className="w-[100px] mobileL:w-[250px]  tablet:w-[300px]">
              <img src={TDM_Logo01} alt="Main Logo" />
            </div>
            <div className="w-[50px] mobileL:w-[130px]  tablet:w-[300px]">
              <img src={inflatableIsland} alt="Main Logo" className="mx-auto" />
            </div>
            <div className="w-[75px] mobileL:w-[250px] tablet:w-[300px]">
              <img src={gootopia} alt="Main Logo" />
            </div>
            <div className="w-[70px] mobileL:w-[250px]  tablet:w-[300px]">
              <img src={pink} alt="Main Logo" className="tablet:m-6" />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-3 py-10">
            {Array.from({ length: Math.ceil(BusinessUnits.length / 2) }).map(
              (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex flex-row justify-center gap-5 tablet:gap-10"
                >
                  {BusinessUnits.slice(rowIndex * 2, rowIndex * 2 + 2).map(
                    (item) => (
                      <button
                        key={item.id}
                        className="mb-1 tablet:mb-5 h-[50%] w-[50%] cursor-pointer rounded-3xl border-[3px] border-slate-300 relative hoverEffectsTopbar"
                      >
                        <Link to={user ? item.link : routes.Login}>
                          <img
                            src={item.image}
                            alt="logo"
                            className="rounded-3xl"
                          />
                          <div className="absolute inset-x-0 bottom-1 tablet:bottom-6 flex items-center justify-center">
                            <img
                              src={booknow}
                              className="h-[15px] mobileL:h-[30px] tablet:h-[50px] laptopL:h-[80px] z-10"
                            />
                          </div>
                        </Link>
                      </button>
                    )
                  )}
                </div>
              )
            )}
          </div>

       
        </div>
      </div>

      <div className=" bg-white w-full flex justify-center pt-[50px] tablet:pt-[100px] pb-[100px] ">
            <div className="h-[70%] w-[70%]">
              <img src={ASSEENON} alt="Main Logo" className="" />
            </div>
          </div>
    </>
  );
}