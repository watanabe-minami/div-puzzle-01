import React from "react";
import "./Card.css";

const Card = ({ characters }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img
          src={characters.images?.[0] || "https://via.placeholder.com/150"}
          alt={characters.name || "キャラクター画像"}
        />
      </div>

      <h3 className="cardName">{characters.name || "名前なし"}</h3>
      <div className="cardTypes">
        <div>特徴</div>
        {Array.isArray(characters.uniqueTraits) && characters.uniqueTraits.length > 0 ? (
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
          <p>術：{characters.jutsu?.join(", ") || "情報なし"}</p>
        </div>
        <div className="cardData">
          <p className="title">性格：{characters.natureType?.join(", ") || "情報なし"}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
