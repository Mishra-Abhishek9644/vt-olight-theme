import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange } from "../store/slices/diamondFiltersSlices";
import tooltip from "../assets/tooltip.svg"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Price = () => {
  const priceRange = useSelector(state => state.diamondFilters.filters.priceRange)
  const dispatch = useDispatch();

  const [minVal, setMinVal] = useState(priceRange[0]);
  const [maxVal, setMaxVal] = useState(priceRange[1]);

  const updateRedux = (min, max) => {
    dispatch(setPriceRange([min, max]));
  };

  useEffect(() => {
    setMinVal(priceRange[0]);
    setMaxVal(priceRange[1]);
  }, [priceRange])



  return (
    <div className="flex flex-col  rounded-md p-2 w-full pb-6 pb-2">
      <div className='flex justify-start mb-auto items-center w-full px-2'>
        <h2 className="text-xl text-gray-700 leading-none">Price</h2>

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
        max={100000}
        step={1000}
        value={priceRange}
        onChange={(v) => updateRedux(v[0], v[1])}
        className="w-full"
        allowCross={false}
        railStyle={{ background: "#E5E7EB", height: 5, borderRadius: 10 }}
        trackStyle={[{ background: "rgb(128, 66, 148)", height: 5, borderRadius: 10 }]}
        handleStyle={[
          { width: 15, height: 15, background: "rgb(128, 66, 148)", border: "none", borderRadius: "50%" },
          { width: 15, height: 15, background: "rgb(128, 66, 148)", border: "none", borderRadius: "50%" }
        ]}

      />

      <div className="flex justify-between gap-4 mt-4 w-full">
        <input
          type="number"
          min={1}
          value={minVal}
          onChange={(e) => setMinVal(e.target.value)}
          onBlur={() => updateRedux(+minVal, +maxVal)}     // Save only on finish ✔
          className="w-1/2 border p-2 rounded"
        />

        <input
          type="number"
          max={100000}
          value={maxVal}
          onChange={(e) => setMaxVal(e.target.value)}
          onBlur={() => updateRedux(+minVal, +maxVal)}     // Save only on finish ✔
          className="w-1/2 border p-2 rounded"
        />
      </div>
    </div>
  );
};

export default Price;
