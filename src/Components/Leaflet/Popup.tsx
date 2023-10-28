import React, { useEffect, useState } from "react";
import Static from "../Static/Static";
import ChartPage from "../Chart/ChartPage";

const Popup = ({ infoModal, createdLayer, closeModal }) => {
  const [step, setStep] = useState(1); // State to manage the step of the form

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (infoModal && e.target.classList.contains("main-modal")) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [infoModal, closeModal]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const goToStep = (stepNumber) => {
    setStep(stepNumber);
  };

  return (
    <>
      {infoModal && (
        <div className="main-modal fixed w-full h-full inset-0 z-[1000] overflow-hidden flex justify-center items-center animated fadeIn faster">
          <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:w-2/3 mx-auto rounded z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex flex-col items-center border-b-2 pb-3">
                <div className="flex">
                  <div
                    className={`mr-4 cursor-pointer text-xl ${
                      step === 1 ? "font-bold" : "text-gray-700"
                    }`}
                    onClick={() => goToStep(1)}
                  >
                    Info
                  </div>
                  <div
                    className={`mr-4 cursor-pointer text-xl ${
                      step === 2 ? "font-bold" : "text-gray-700"
                    }`}
                    onClick={() => goToStep(2)}
                  >
                    Chart
                  </div>
                  <div
                    className={`cursor-pointer text-xl ${
                      step === 3 ? "font-bold" : "text-gray-700"
                    }`}
                    onClick={() => goToStep(3)}
                  >
                    Static
                  </div>
                </div>
              </div>
              {step === 1 && (
                <>
                  <div className="my-5">
                    <div className="grid grid-cols-4 grid-rows-5 gap-6">
                      <div className="col-span-2">{createdLayer?.feature?.properties?.id}</div>
                      <div className="col-span-2 row-span-4 col-start-1 row-start-2">
                        <img
                          src={createdLayer?.feature?.properties?.image || ""}
                          alt={createdLayer?.feature?.properties?.name}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="col-start-3 row-start-1">13</div>
                      <div className="col-start-3 row-start-2">14</div>
                      <div className="col-start-3 row-start-3">15</div>
                      <div className="col-start-3 row-start-4">16</div>
                      <div className="col-start-3 row-start-5">17</div>
                      <div className="col-start-4 row-start-1">
                        <p className="text-red-600">
                          {createdLayer?.feature?.properties?.name}
                        </p>
                      </div>
                      <div className="col-start-4 row-start-2">
                        <p>
                          {createdLayer?.feature?.properties?.details || ""}
                        </p>
                      </div>
                      <div className="col-start-4 row-start-3">20</div>
                      <div className="col-start-4 row-start-4">21</div>
                      <div className="col-start-4 row-start-5">22</div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={closeModal}
                      className="focus:outline-none px-4 bg-teal-500 p-3 rounded-lg text-white hover:bg-teal-400"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <ChartPage />
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={closeModal}
                      className="focus:outline-none px-4 bg-teal-500 p-3 rounded-lg text-white hover:bg-teal-400"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <Static />
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={closeModal}
                      className="focus:outline-none px-4 bg-teal-500 p-3 rounded-lg text-white hover:bg-teal-400"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
