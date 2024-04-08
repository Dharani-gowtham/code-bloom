import { useState } from "react";
import MenuBar from "../components/MenuBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Course = () => {
  const [dummyData, setDummyData] = useState([
    {
      id: "1",
      name: "Frontend",
      value: 25,
      batch: true,
    },
    {
      id: "2",
      name: "Backend",
      value: 50,
      batch: false,
    },
    {
      id: "3",
      name: "Item 3",
      value: 75,
      batch: false,
    },
    {
      id: "4",
      name: "Item 4",
      value: 100,
      batch: false,
    },
    // Add more data items as needed
  ]);
  return (
    <>
      <MenuBar />
      <div className="home-container">
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search..." />
          <button className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="data-container">
          {dummyData.map((item) => (
            <div
              key={item.id}
              className={`data-item ${item.batch ? "batch-highlight" : ""}`}
            >
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Course;
