import { useContext } from "react";
import { MyContext } from "../../Context/SectionContext";

export default function Card1({ item }) {
  return (
    <div className="card-inner">
      <h3>{item.name}</h3>
      <div className="info">
        <span >{item.position}:</span>
        <span>{item.company}</span>
      </div>
      <p>{item.description}</p>
    </div>
  );
}
