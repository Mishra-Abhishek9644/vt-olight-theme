import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useSelector, useDispatch } from "react-redux";
import { setCarat } from "../store/slices/diamondFiltersSlices.js";
import tooltip from "../assets/tooltip.svg"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Carats = () => {

  const dispatch = useDispatch();

  // 🔥 Persistent value (real source of truth)
  const caratRange = useSelector(state => state.diamondFilters.filters.caratRange);

  // ⭐ Local input copy so typing doesn't immediately dispatch
  const [minVal, setMinVal] = useState(caratRange[0]);
  const [maxVal, setMaxVal] = useState(caratRange[1]);

  // 🔥 When redux changes → sync input fields
  useEffect(() => {
    setMinVal(caratRange[0]);
    setMaxVal(caratRange[1]);
  }, [caratRange]);

  const updateRedux = (min, max) => {
    dispatch(setCarat([min, max]));
  };

  return (
    <div className="flex flex-col  rounded-md p-2 w-full pb-6 pb-2">
      <div className='flex justify-start mb-auto items-center w-full px-2'>
        <h2 className="text-xl text-gray-700 leading-none">Carat</h2>

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
        min={0}
        max={30}
        step={0.1}
        value={caratRange}
        onChange={(v) => updateRedux(v[0], v[1])} // slider updates instantly ✔
        allowCross={false}
        railStyle={{ background: "#E5E7EB", height: 5, borderRadius: 10 }}
        trackStyle={[{ background: "rgb(128, 66, 148)", height: 5, borderRadius: 10 }]}
        handleStyle={[
          { width: 15, height: 15, background: "rgb(128, 66, 148)", border: "none", borderRadius: "50%" },
          { width: 15, height: 15, background: "rgb(128, 66, 148)", border: "none", borderRadius: "50%" }
        ]}
      />

      {/* Inputs update Redux ONLY when user finishes typing (onBlur) */}
      <div className="flex justify-between gap-4 mt-3">

        <input
          type="number"
          value={minVal}
          min={0.1}
          step="0.1"
          onChange={(e) => setMinVal(e.target.value)}       // typing stays local
          onBlur={() => updateRedux(+minVal, +maxVal)}     // Save only on finish ✔
          className="w-1/2 border p-2 rounded"
        />

        <input
          type="number"
          value={maxVal}
          step="0.1"
          max={30}
          onChange={(e) => setMaxVal(e.target.value)}       // typing local
          onBlur={() => updateRedux(+minVal, +maxVal)}     // Save only on finish ✔
          className="w-1/2 border p-2 rounded"
        />

      </div>
    </div>
  );
};

export default Carats;
