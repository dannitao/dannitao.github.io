import React from "react";
import "./Cards.css";

const Cards = ({ item, pics }) => {
  return (
    <div className="cards-container">
      {item.map((Val) => {
        return (
          <div className="card" key={Val.id}>
            <div>
              <b>{Val.title}</b>
            </div>
            {pics && <img src={Val.img} className="photo" alt={Val.title} />}
            <div>{Val.date}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
