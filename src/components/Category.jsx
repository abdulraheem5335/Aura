import { Link } from "react-router-dom";
import "../style/category.css";

export function Category({ list, basepath }) {
  return (
    <div className="categorycontainer">
      <h1 className="categoryheading">Shop Popular Categories</h1>
      <div className="categorylist">
        {list.map((item, index) => {
          return (
            <div className="category" key={index}>
              <img src={item.path} alt={item.name} />
              <Link to={`${basepath}${item.name}`}>{item.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
