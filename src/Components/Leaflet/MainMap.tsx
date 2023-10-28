import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faEye, faMagnifyingGlass, faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import { ImageOverlay, MapContainer } from "react-leaflet";
import { LatLngBoundsLiteral } from "leaflet";
import { GeoJSON } from "react-leaflet";
import { data } from "./data/data";
import { data2 } from "./data/data2";
import Topbar from "../Topbar/Topbar";
import SearchMap from "./SearchMap";
import Popup from "./Popup";
import { Tooltip } from "devextreme-react/tooltip";
type State = {
  imageUrl: string | null;
  polygonName: string;
  showModal: boolean;
  infoModal: boolean;
  createdLayer: any | null;
  details: string;
  imageFile: File | null;
  showPopup: boolean;
};

const initialState: State = {
  imageUrl: null,
  polygonName: "",
  showModal: false,
  infoModal: false,
  createdLayer: null,
  details: "",
  imageFile: null,
  showPopup: false,
};

const bounds: LatLngBoundsLiteral = [
  [0, 0],
  [4000, 300],
];

const MainMap: React.FC = () => {
  const [state, setState] = useState<State>(initialState);
  const [selectedData, setSelectedData] = useState(data); // เริ่มต้นด้วย data
  const [mapCenter, setMapCenter] = useState<[number, number]>([65, 150]);
  const [mapZoom, setMapZoom] = useState<number>(4);
  const [showSearch, setSearch] = useState<boolean>(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [slideAnimation, setSlideAnimation] = useState<boolean>(false);
  const mapRef = useRef<any>(null);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>("");

  const toggleSidebar = () => {
    setIsTopBarVisible(!isTopBarVisible);
  };

  const toggleTable = () => {
    console.log(showSearch);
    setSearch(!showSearch);
  };

  // const onEachFeature = (feature, layer) => {
  //   if (feature.properties && feature.properties.name) {
  //     layer.bindPopup(feature.properties.name);
  //   }
  // };

  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const popupContent = `
      <div class="max-w-sm p-4">
        <h3 class="text-lg font-bold">${feature.properties.name}</h3>
        <img src="${feature.properties.image || image}" alt="${
        feature.properties.name
      }" class="mt-2 mb-4" width="100" />
        <p class="text-sm">${feature.properties.details || ""}</p>
      </div>`;
      layer.bindPopup(popupContent, { maxWidth: 400, className: "stylePopup" });

      layer.on("mouseover", function () {
        layer.setStyle({ fillOpacity: 0.2 }); // Change opacity or any other style
        layer.openPopup();
      });

      layer.on("mouseout", function () {
        layer.setStyle({ fillOpacity: 0 }); // Hide the polygon on mouseout
        layer.closePopup();
      });

      layer.on("click", function () {
        setState((prevState) => ({
          ...prevState,
          infoModal: !prevState.infoModal,
          createdLayer: layer,
        }));
        flyToFeature(feature);
      });
    }
  };

  const flyToFeature = (feature: any) => {
    if (feature && feature.geometry && feature.geometry.type === "Polygon") {
      const coordinates = feature.geometry.coordinates[0];
      if (coordinates.length > 0) {
        const sumLatLng = coordinates.reduce(
          (acc: [number, number], coord: [number, number]) => {
            return [acc[0] + coord[0], acc[1] + coord[1]];
          },
          [0, 0]
        );
        const avgLatLng = [
          sumLatLng[1] / coordinates.length,
          sumLatLng[0] / coordinates.length,
        ];
        const map = mapRef.current;
        if (map) {
          map.flyTo(avgLatLng, 6);
        }
      }
    }
  };

  const renderGeoJSONStyle = (feature: any) => {
    const defaultStyle = {
      fillColor: "none",
      fillOpacity: 0,
      color: "none",
      weight: 0,
    };

    if (feature && feature.properties && feature.properties.color) {
      return {
        ...defaultStyle, // override defaults with properties if they exist
        fillColor: feature.properties.color,
        color: feature.properties.color,
      };
    }

    return defaultStyle;
  };

  return (
    <div className="w-full">
      <Topbar
        toggleTable={toggleTable}
        isTopBarVisible={isTopBarVisible}
        toggleSidebar={toggleSidebar}
      />

      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={mapZoom}
        style={{ zIndex: 1 }}
        className="w-full h-screen"
      >
        <ImageOverlay
          bounds={bounds}
          url={selectedData.imageOverlayUrl} // ใช้ URL จาก selectedData
        />
        {selectedData && (
          <GeoJSON
            data={selectedData}
            key={JSON.stringify(selectedData)}
            onEachFeature={onEachFeature}
            style={renderGeoJSONStyle}
          />
        )}
      </MapContainer>
      <SearchMap
        flyToFeature={flyToFeature}
        showSearch={showSearch}
        toggleTable={toggleTable}
        isTopBarVisible={isTopBarVisible}
        selectedData={selectedData}
      />
      <Popup
        infoModal={state.infoModal}
        createdLayer={state.createdLayer}
        closeModal={() =>
          setState((prevState) => ({ ...prevState, infoModal: false }))
        }
      />

      <button
        onClick={toggleSidebar}
        className="w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white font-semibold p-2  rounded-full shadow-md fixed bottom-4 right-20 m-6 z-[1000]" >
        {isTopBarVisible ? 
        (
        <FontAwesomeIcon icon={faMinimize} />
        ) : 
        (
        <FontAwesomeIcon icon={faMaximize} />
        )
        }
        
      </button>
      <div className="fixed bottom-4 right-4 m-6 z-[1000]">
        <button
          onClick={toggleTable}
          className="w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white font-semibold p-2  rounded-full shadow-md"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
        </button>
      </div>
    </div>
  );
};

export default MainMap;
