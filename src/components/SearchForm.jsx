import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { jobType, mode, industry } from "../data/jobs";
import { useGlobalContext } from "../hooks/useGlobalContext";
import axios from "axios"

const SearchForm = () => {
  const {updateJobType, updateMode, updateIndustry, updateLocation} = useGlobalContext()
  const [jType, setJType] = useState("")
  const [modeType, setModeType] = useState("")
  const [industryType, setIndustryType] = useState("")
  const [locsType, setLocsType] = useState()
  const [location, setLocation] = useState([])
  const [industries, setIndustries] = useState([])
  const path = useLocation().pathname;
  const handleSelection = (e) => {
    e.preventDefault();
    updateJobType(jType)
    updateMode(modeType)
    updateIndustry(industryType)
    updateLocation(locsType)

   
    
    // reset input
    setJType("")
    setModeType("")
    setIndustryType("")
    setLocation("")
  };

   useEffect(() => {
     const getLocations = async () => {
       const { data } = await axios(
         "https://jobme-server-ntj9.onrender.com/api/v1/jobs/locations"
       );
       setLocation(data.location);
       setIndustries(data.industries)
     };
     getLocations();
   }, []);


  return (
    <div className="searchform p-3">
      <form onSubmit={handleSelection} className="container ">
        <div>
          <select
            name=""
            id="job"
            className=" form-select py-2  px-xl-4 rounded-2 fs-5 text-capitalize "
            value={jType}
            onChange={(e) => setJType(e.target.value)}
          >
            <option value="">Select Job Type</option>
            {jobType.map((type, i) => {
              return (
                <option key={i} value={type}>
                  {" "}
                  {type}{" "}
                </option>
              );
            })}
          </select>
          <select
            name=""
            id="industry"
            className="form-select py-2 px-xl-4 rounded-2 fs-5 text-capitalize"
            value={industryType}
            onChange={(e) => setIndustryType(e.target.value)}
          >
            <option value="">Select Industry</option>
            {industries && industries.map((type, i) => {
              return (
                <option key={i} value={type}>
                  {" "}
                  {type}{" "}
                </option>
              );
            })}
          </select>
          <select
            name=""
            id="mode"
            className="form-select py-2 px-xl-4 rounded-2 fs-5 text-capitalize"
            value={modeType}
            onChange={(e) => setModeType(e.target.value)}
          >
            <option value="">Select Mode of Work</option>
            {mode.map((m, i) => {
              return (
                <option key={i} value={m}>
                  {m}
                </option>
              );
            })}
          </select>
          <select
            name=""
            id="location"
            className="form-select py-2 px-xl-4 rounded-2 fs-5"
            value={locsType}
            onChange={(e) => setLocsType(e.target.value)}
          >
            <option value="">Select Location</option>
            {location && location.map((loc, index) => {
                return (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                );
              })}
          </select>
          <div className="d-xl-flex align-items-center justify-content-center">
            {path === "/" ? (
              <Link to="/jobs">
                <button className="btn btn-info text-white py-2 px-xl-4 fs-5">
                  Find Jobs
                </button>
              </Link>
            ) : (
              <button className=" mt-2 mt-lg-0 btn btn-info text-white py-2 px-xl-4 fs-5">
                Find Jobs
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
