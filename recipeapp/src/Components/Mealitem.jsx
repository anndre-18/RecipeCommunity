import React from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import './header-home.css';

const Mealitem = ({ data }) => {
  return (
    <section className='recipe-grid'>
    <div className="recipe-card">
      {data.map((item, index) => (
        <div key={item.id || index} className="card">
          <div className="image-card">
            <img src={item.image || "https://via.placeholder.com/150"} alt={item.title} />
          </div>
          <div className="name-card">
            <h3>{item.title}</h3>
            {/* <p>⏳ {item.time || "N/A"} minutes</p> */}
            <button><IoMdHeartEmpty size={24} /></button>
          </div>
        </div>
      ))}
    </div>
    </section>
  );
};

export default Mealitem;
