import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"
import { useDispatch, useSelector } from "react-redux";
import { setDepthRange } from "../store/slices/diamondFiltersSlices";
import tooltip from "../assets/tooltip.svg"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Depth = () => {
  const depthRange = useSelector(state => state.diamondFilters.filters.depthRange)
  const [minVal, setMinVal] = useState(depthRange[0]);
  const [maxVal, setMaxVal] = useState(depthRange[1]);
  const dispatch = useDispatch();

  useEffect(() => {
    setMinVal(depthRange[0]);
    setMaxVal(depthRange[1]);
  }, [depthRange]);

  const updateRedux = (min, max) => {
    dispatch(setDepthRange([min, max]));
  };

  return (
    <div className="flex flex-col  rounded-md p-2 w-full pb-6 ">
          <div className='flex justify-start mb-auto items-center w-full px-2'>
            <h2 className="text-xl text-gray-700 leading-none">Depth%</h2>
    
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="This filter allows you to select a ring shape"
              className='p-1 rounded-full cursor-pointer mt-1'
            >
              <img src={tooltip} className='w-5 h-5' />
            </a>
          </div>


      <Slider
        range
        min={1}
        max={100}
        step={1}
        value={depthRange}
        onChange={(v) => updateRedux(v[0], v[1])} // slider updates instantly ✔
        allowCross={false}
        railStyle={{ background: "#000000", height: 5, borderRadius: 10 }}
        trackStyle={[{ background: "rgb(219, 175, 55)", height: 5, borderRadius: 10 }]}
        handleStyle={[
          { width: 15, height: 15, background: "rgb(219, 175, 55)", border: "none", borderRadius: "50%" },
          { width: 15, height: 15, background: "rgb(219, 175, 55)", border: "none", borderRadius: "50%" }
        ]}
      />

      {/* Inputs update Redux ONLY when user finishes typing (onBlur) */}
      <div className="flex justify-between gap-4 mt-3">

        <input
          type="number"
          value={minVal}
          min={1}
          step="1"
          onChange={(e) => setMinVal(e.target.value)}       // typing stays local
          onBlur={() => updateRedux(+minVal, +maxVal)}     // Save only on finish ✔
          className="w-1/2 border p-2 rounded"
        />

        <input
          type="number"
          value={maxVal}
          step="1"
          max={100}
          onChange={(e) => setMaxVal(e.target.value)}       // typing local
          onBlur={() => updateRedux(+minVal, +maxVal)}     // Save only on finish ✔
          className="w-1/2 border p-2 rounded"
        />

      </div>
    </div>
  );
};

export default Depth;
