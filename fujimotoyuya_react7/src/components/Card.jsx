import React from "react";
import "./Card.css";

const Card = ({ characters }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img
          src={characters.images || "https://via.placeholder.com/150"}
          alt={characters.name}
        />
      </div>

      <h3 className="cardName">{characters.name || "名前なし"}</h3>
      <div className="cardTypes">
        <div>特徴</div>
        {characters.uniqueTraits ? (
          characters.uniqueTraits.map((uniqueTrait, index) => (
            <div key={index}>
              <span className="uniqueTraitsName">{uniqueTrait.name}</span>
            </div>
          ))
        ) : (
          <div>特徴情報がありません</div>
        )}
      </div>
      <div className="cardInfo">
        <div className="title">
          <p>術：{characters.jutsu || "情報なし"}</p>
        </div>
        <div className="cardData">
          <p className="title">性格：{characters.natureType || "情報なし"}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
