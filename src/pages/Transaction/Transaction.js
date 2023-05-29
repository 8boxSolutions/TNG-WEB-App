import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
// import { Topbar } from "../../components/NavigationBars";
// import Footer from "../../components/Footer/index";
import SkeletonTable from "../../components/Animation/SkeletonLoader";
import { getDate } from "../../helper";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import Status from "../../components/Status/Status";
// import { GlobalToolTip } from "../../components/ToolTip";
import { FaEllipsisV } from "react-icons/fa";
import TransactionModal from "../../components/Modal/Profile/TransactionModal/TransactionModal";
// import BusinessUnitModal from "../../components/Modal/BusinessUnitModal/BusinessUnitModal";
// import { changeStatusBusinessUnit, viewBusinessUnit } from "../../functions";
import { useSelector } from "react-redux";
import { Topbar } from "../../components/Navbar";
import { viewMyTransaction } from "../../functions/Booking";

const tableHeader = [
  "Code",
  "Booking Date",
  "Booking Time",
  "Pax",
  "Payment Method",
  "Total Price",
  "Date Created",
  "Status",
];
let title = "Transactions";

export default function Transaction() {
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [record, setRecord] = useState([]);
  const [tooltip, showTooltip] = useState(true);
  // const [statusFilter, setStatusFilter] = useState("All");
  const [dataPageCount, setDataPageCount] = useState(1);
  const [openEditBusinessUnitModal, setOpenEditBusinessUnitModal] =
    useState(false);
  const [editData, setEditData] = useState("");
  const [toAddData, isToAddData] = useState(false);
  const [dataAdded, setDataAdded] = useState();
  const { user } = useSelector((state) => state.record);

  // const handleFilterChange = (event) => {
  //   setStatusFilter(event.target.value);
  //   setPageNumber(1);
  // };

  // Open edit post Modal
  const openEditModal = () => {
    setOpenEditBusinessUnitModal(true);
  };

  // CLose edit post Modal
  const closeEditModal = () => {
    setOpenEditBusinessUnitModal(false);
    isToAddData(false);
  };

  const getEditData = (data) => {
    // setOpenEditBusinessUnitModal(true);
    setEditData(data);
    openEditModal();
  };

  const addData = () => {
    // setOpenEditBusinessUnitModal(true);
    setEditData();
    openEditModal();
    isToAddData(true);
  };

  const _promptChangeStatus = async (a, b) => {
    // await changeStatusBusinessUnit(a, b)
    //   .then((res) => setDataAdded(!dataAdded))
    //   .catch();
  };

  const PAGE_SIZE = 10;

  useEffect(() => {
    viewMyTransaction(user.id)
      .then((response) => {
        // console.log(response)
        if (response.valid) {
          setRecord(response.data);
          // setDataPageCount(response.pageCount)
        } else {
        }
      })
      .catch();
  }, []);

  const tableData = useMemo(() => {
    if (!loading) {
      return (
        <>
          <tr className="border-b max-w-96">
            {tableHeader.map((data, index) => {
              return <SkeletonTable key={index} />;
            })}
          </tr>
        </>
      );
    } else {
      if (record?.length > 0) {
        console.log(record);
        return record
          .filter((data) => {
            if (search === null) return data;
            else if (
              data.Code.toLowerCase().includes(search.toLowerCase()) ||
              data.BookingDate.toLowerCase().includes(search.toLowerCase())
            ) {
              return data;
            }
          })
          .map((data, index) => {
            // console.log(data);
            return (
              <tr className="border-b max-w-96" key={index}>
                <td
                  onClick={() => getEditData(data)}
                  className=" font-poppins text-center px-6 py-4 text-sm font-medium text-gray-900 max-w-[300px]"
                >
                  {/* {tooltip && (
                        <ReactTooltip
                          id="memo"
                          place="top"
                          effect="solid"
                          className="customeTheme"
                        />
                      )} */}
                  <p
                    data-tip="Click to view details"
                    data-for="memo"
                    className=" font-poppins cursor-pointer hover:text-BrrringYellow "
                    onMouseEnter={() => showTooltip(true)}
                    onMouseLeave={() => {
                      showTooltip(false);
                      setTimeout(() => showTooltip(true));
                    }}
                  >
                    {data.Code}
                  </p>
                </td>
                <td className=" font-poppins text-center px-6 py-4 text-sm font-medium text-gray-900 max-w-[300px]">
                  {data.BookingDate}
                </td>
                <td className=" font-poppins text-center px-6 py-4 text-sm font-medium text-gray-900 max-w-[300px]">
                  {data.BookingTime}
                </td>
                <td className=" font-poppins text-center px-6 py-4 text-sm font-medium text-gray-900 max-w-[300px]">
                  {data.Pass}
                </td>
                <td className=" font-poppins text-center px-6 py-4 text-sm font-medium text-gray-900 max-w-[300px]">
                  {data.Payment.PaymentMethod === undefined ? "UB" : "BDO"}
                </td>
                <td className=" font-poppins text-center px-6 py-4 text-sm font-medium text-gray-900 max-w-[300px]">
                  {data.TotalPrice}
                </td>
                <td className=" font-poppins text-center px-6 py-4 text-sm font-medium text-gray-900 max-w-[300px]">
                  {getDate(data.CreatedTS)}
                </td>
                <td className=" font-poppins px-6 py-4 text-sm font-medium text-gray-900 max-w-[300px] flex justify-center">
                  <span className="w-20 h-7 text-center flex justify-center items-center rounded-lg text-slate-50">
                    <Status status={data.Status} />
                  </span>
                </td>
                {/* <td className=" font-poppins px-6 py-4 text-sm font-medium text-gray-900 max-w-[300px] text-center">
                  <a
                    class=" text-black text-[18px] rounded-full mx-1 font-bold justify-center"
                    href="#"
                    type="button"
                    id="dropdownMenuButton2"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <FaEllipsisV />
                  </a>
                  <ul
                    class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownMenuButton2"
                    data-te-dropdown-menu-ref
                  >
                    {data.Status === "A" ? (
                      <li>
                        <a
                          class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                          href="#"
                          data-te-dropdown-item-ref
                          onClick={() => {
                            _promptChangeStatus(data.id, "I");
                          }}
                        >
                          Inactive
                        </a>
                      </li>
                    ) : (
                      <li>
                        <a
                          class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                          href="#"
                          data-te-dropdown-item-ref
                          onClick={() => {
                            _promptChangeStatus(data.id, "A");
                          }}
                        >
                          Active
                        </a>
                      </li>
                    )}
                  </ul>
                </td> */}
              </tr>
            );
          });
      } else {
        return "No data available";
      }
    }
  }, [loading, record, search, tooltip, getEditData]);

  return (
    <>
      <Helmet>
        <title>TNG Admin | Business Unit</title>
      </Helmet>

      {openEditBusinessUnitModal && (
        <TransactionModal
          ariaHideApp={false}
          editData={editData}
          record={record}
          closeEditModal={closeEditModal}
          openEditBusinessUnitModal={openEditBusinessUnitModal}
          toAddData={toAddData}
          setDataAdded={setDataAdded}
          dataAdded={dataAdded}
        />
      )}
      <div className="min-h-screen flex flex-col bluegradient">
        <Topbar />
        <div className=" p-10 gap-8 mb-auto font-poppins ">
          <div className="text-2xl flex flex-row">
            {title}
            <div className="ml-auto flex mt-10">
              <div className="flex mb-2 flex-row justify-center gap-3 items-center">
                {/* <ExportExcel
                  // csvData={dateToExport()}
                  fileName={
                    state?.user?.Name?.FirstName +
                    String(
                      statusFilter === "V"
                        ? "-Verified-"
                        : statusFilter === "U"
                        ? "-Rejected-"
                        : statusFilter === "All"
                        ? "-All-"
                        : "-Archived-"
                    ) +
                    "Users"
                  }
                  onRequestRecord={getExcelRecord}
                />
                <GlobalToolTip title={title}/>
                {redAdd} */}
                <div>
                  {/* <button className="bluegradient text-[15px] h-8 self-center rounded-[5px] px-3 mt-2">
                  {" "}
                  Export
                </button> */}
                </div>
                <div>
                  {/* <button
                  className="bluegradient text-[15px] h-8 self-center rounded-[5px] px-3 mt-2"
                  onClick={() => addData()}
                >
                  {" "}
                  + New Business Unit
                </button> */}
                </div>
                <div>{/* <GlobalToolTip title={title} /> */}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 p-5 rounded-lg shadow-lg bg-white">
            <div className="flex flex-row place-items-center">
              <div>
                {/* <div className="flex justify-center mr-2">
                  <select
                    id="ddlProducts"
                    className="w-[140px]  block px-3 py-1.5 text-sm text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    onChange={handleFilterChange}
                  >
                    <option value="All">All</option>
                    <option value="A">Active</option>
                    <option value="I">Inactive</option>
                    <option value="X">Archived</option>
                  </select>
                </div> */}
              </div>
              <input
                type="text"
                className=" w-full h-10 border border-1 border-solid border-gray-300 rounded "
                placeholder=" Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <img src={FindFoodIcon} alt="FindFood" className="-ml-10 h-7" /> */}
            </div>
            <div className="flex flex-col">
              <DataTable header={tableHeader} tableData={tableData} />
            </div>
            <Pagination
              dataPageCount={dataPageCount}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </div>
        </div>
        {/* <Footer className="mt-auto"/> */}
      </div>
    </>
  );
}