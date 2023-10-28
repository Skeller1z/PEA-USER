import TextBox from "devextreme-react/text-box";
import React, { useRef, useState } from "react";

const SearchMap = ({ 
    showSearch, 
    toggleTable, 
    selectedData,
    flyToFeature,
    isTopBarVisible
}) => {
  const searchInput = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const polygonData = selectedData.features;

  const handleSearch = (e) => {
    setSearchQuery(e.value);
  };

  const filteredPolygonData = polygonData.filter((feature) =>
    feature.properties.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderResults = () => {
    if (filteredPolygonData.length === 0) {
      return <div>ไม่พบข้อมูล</div>;
    } else {
      return filteredPolygonData.map((feature, index) => (
        <div
          key={index}
          onClick={() => flyToFeature(feature)}
          className="flex items-center p-3 my-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
        >
          <img
            src={feature.properties.image}
            alt={feature.properties.name}
            className="w-10 h-10 object-cover rounded-full"
          />
          <div className="ml-3">{feature.properties.name}</div>
        </div>
      ));
    }
  };

  return (
    <>
      <div
        className={`z-[999] fixed top-0 right-0 h-full w-1/5 bg-white shadow-lg transition-transform duration-300 transform ${
          isTopBarVisible ? "mt-[81px]" : ""
        } ${
          showSearch ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleTable} className="text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          {/* Add your search component here */}
          <TextBox
            placeholder="Search..."
            defaultValue=""
            onValueChanged={handleSearch}
            ref={searchInput}
          />
          <div className="mt-4">{renderResults()}</div>
        </div>
      </div>
    </>
  );
};

export default SearchMap;
