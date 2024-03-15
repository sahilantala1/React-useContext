import React, { useEffect, useState } from "react";
import "./Covid.css";

function Covid() {
  const [data, setdata] = useState("");
  const getCovidData = async () => {
    try {
      const res = await fetch("https://data.covid19india.org/data.json");
      const actualData = await res.json();
      setdata(actualData.statewise[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCovidData();
  }, []);
  return (
    <div className="container">
      <h2>LIVE</h2>
      <div className="card_main">
        <div className="card_inner">
          <p className="card_name">
            <span>OUR</span> COUNTRY
          </p>
          <p className="card_total card-small">INDIA</p>
          <h3>{data.active}</h3>
        </div>
        <div className="card_inner">
          <p className="card_name">CONFIRMED</p>
          <p className="card_total card-small">Confirm</p>
          <h3>{data.confirmed}</h3>
        </div>
        <div className="card_inner">
          <p className="card_name">DEATHS</p>
          <p className="card_total card-small">INDIA</p>
          <h3>{data.deaths}</h3>
        </div>
        <div className="card_inner">
          <p className="card_name">DELTACONFIRMED</p>
          <p className="card_total card-small">INDIA</p>
          <h3>{data.deltaconfirmed}</h3>
        </div>
        <div className="card_inner">
          <p className="card_name">DELTADEATHS</p>
          <p className="card_total card-small">INDIA</p>
          <h3>{data.deltadeaths}</h3>
        </div>
        <div className="card_inner">
          <p className="card_name">DELTARECOVERED</p>
          <p className="card_total card-small">INDIA</p>
          <h3>{data.deltarecovered}</h3>
        </div>
        <div className="card_inner">
          <p className="card_name">LAST UPDATED DATA</p>
          <p className="card_total card-small">INDIA</p>
          <h3>{data.lastupdatedtime}</h3>
        </div>
        <div className="card_inner">
          <p className="card_name">MIGRATEDOTHER</p>
          <p className="card_total card-small">INDIA</p>
          <h3>{data.migratedother}</h3>
        </div>
        <div className="card_inner">
          <p className="card_name">RECOVERED</p>
          <p className="card_total card-small">INDIA</p>
          <h3>{data.recovered}</h3>
        </div>
        <div className="card_inner">
          <p className="card_name">STATE</p>
          <p className="card_total card-small">INDIA</p>
          <h3>{data.state}</h3>
        </div>
        <div className="card_inner">
          <p className="card_name">STATECODE</p>
          <p className="card_total card-small">INDIA</p>
          <h3>{data.statecode}</h3>
        </div>
        <div className="card_inner">
          <p className="card_name">
            <span>OUR</span> COUNTRY
          </p>
          <p className="card_total card-small">INDIA</p>
          <h3>Any</h3>
        </div>
      </div>
    </div>
  );
}

export default Covid;
