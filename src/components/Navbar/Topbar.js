import React, { useEffect, useRef, useState } from "react";
import { bakebenav, gootopianav, isnav, logo, nx, tdmnav } from "../../assets/Dessert";
import { MdMenu } from "react-icons/md";
import routes from "../../constants/routes";
import { Link } from "react-router-dom";

export default function Topbar({scroll}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-[#212121] ">
      <div className="py-auto">
        <div className="flex flex-row justify-between h-[65px] items-center mx-[5px] gap-1 laptop:mx-[20px]">
          <div className="flex flex-row flex-none">
            <div>
              <img src={nx} className="h-10 w-10 object-contain" />
            </div>
            <div>
              <img src={logo} className="hidden tablet:block w-[281px] h-[34px] mt-1" />
            </div>
          </div>

          <div class="h-[40px]  bg-white w-[2px] mr-[3px]"></div>

          <div className="flex flex-row gap-1 laptop:gap-2 flex-1">
          <div>
            <Link to={routes.Home}>
              <div className="cursor-pointer border-2 border-white py-1 px-3 rounded-full h-[35px] laptop:h-[46px]">
                <img src={tdmnav} className="w-full h-full object-contain" />
              </div>
            </Link>  
          </div>

          <div>
            <Link to={routes.PageNotFound}>
              <div className="cursor-pointer border-2 border-white py-1 px-3 rounded-full h-[35px] laptop:h-[46px]">
                <img src={isnav} className="w-full h-full object-contain" />
              </div>
            </Link>
          </div>

          <div>
            <Link to={routes.PageNotFound}>
              <div className="cursor-pointer border-2 border-white py-1 px-3 rounded-full h-[35px] laptop:h-[46px]">
                <img src={bakebenav} className="w-full h-full object-contain" />
              </div>
            </Link>
          </div>

          <div>
            <Link to={routes.LandingGootopia}>
              <div className="cursor-pointer border-2 border-white py-1 px-3 rounded-full h-[35px] laptop:h-[46px]">
                <img
                  src={gootopianav}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>
          </div>
          <div
            className="flex w-1/10 justify-center items-center"
            ref={menuRef}
          >
            <MdMenu
              color="white"
              size={30}
              className="cursor-pointer"
              onClick={handleMenuClick}
            />
            {showMenu && (
              <div className="absolute top-[56px] right-0 w-48 bg-black rounded-md">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <div
                    className="cursor-pointer text-white flex items-center border-y-[1px] border-white py-3 px-4 text-md"
                    role="menuitem"
                  >
                    Profile
                  </div>
                  <div
                    className="cursor-pointer text-white flex items-center py-3 px-4 text-md"
                    role="menuitem"
                  >
                    Transactions
                  </div>
                  <div
                    className="cursor-pointer text-white flex items-center border-t-[1px] border-white py-3 px-4 text-md"
                    role="menuitem"
                  >
                    Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // <div className="relative flex w-full py-2 pr-2 lg:px-8 justify-between bg-[#212121]">
    //   <div className="flex w-1/6 md:w-1/3 pl-2 justify-center items-center border-r-2 border-white">
    //     <img src={nx} className="h-10 w-10 object-contain" />
    //     <img src={logo} className="hidden md:block w-[281px] h-[34px]" />
    //   </div>
    //   <div className="flex w-3/5 lg:pl-6 sm:w-3/5 w-full px-1 gap-1 items-center">
    //     <Link to={routes.Home}>
    //       <div className="cursor-pointer w-[200px] lg:w-[100px] flex items-center border-2 border-white py-1 px-3 rounded-full">
    //         <img src={tdmnav} className="w-full h-full object-contain" />
    //       </div>
    //     </Link>
    //     <Link to={routes.PageNotFound}>
    //       <div className="cursor-pointer w-[200px] lg:w-[100px] flex items-center border-2 border-white py-1 px-3 rounded-full">
    //         <img src={isnav} className="w-full h-full object-contain" />
    //       </div>
    //     </Link>
    //     <Link to={routes.PageNotFound}>
    //       <div className="cursor-pointer w-[200px] lg:w-[100px] flex items-center border-2 border-white py-1 px-3 rounded-full">
    //         <img src={bakebenav} className="w-full h-full object-contain" />
    //       </div>
    //     </Link>
    //     <Link to={routes.LandingGootopia}>
    //       <div className="cursor-pointer w-[200px] lg:w-[100px] flex items-center border-2 border-white py-1 px-3 rounded-full">
    //         <img src={gootopianav} className="w-full h-full object-contain" />
    //       </div>
    //     </Link>
    //   </div>
    //   <div className="flex w-1/10 justify-center items-center" ref={menuRef}>
    //     <MdMenu
    //       color="white"
    //       size={30}
    //       className="cursor-pointer"
    //       onClick={handleMenuClick}
    //     />
    //     {showMenu && (
    //       <div className="absolute top-[56px] right-0 w-48 bg-black rounded-md">
    //         <div
    //           className="py-1"
    //           role="menu"
    //           aria-orientation="vertical"
    //           aria-labelledby="user-menu"
    //         >
    //           <div
    //             className="cursor-pointer text-white flex items-center border-y-[1px] border-white py-3 px-4 text-md"
    //             role="menuitem"
    //           >
    //             Profile
    //           </div>
    //           <div
    //             className="cursor-pointer text-white flex items-center py-3 px-4 text-md"
    //             role="menuitem"
    //           >
    //             Transactions
    //           </div>
    //           <div
    //             className="cursor-pointer text-white flex items-center border-t-[1px] border-white py-3 px-4 text-md"
    //             role="menuitem"
    //           >
    //             Logout
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}
