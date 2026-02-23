import React, { useState,useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"
import { useDispatch, useSelector } from "react-redux";
import { setTableRange } from "../store/slices/diamondFiltersSlices.js";
import tooltip from "../assets/tooltip.svg"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const TableFilter = () => {
  const tableRange = useSelector(
    state => state.diamondFilters.filters.tableRange || [1,100]
  );

  const dispatch = useDispatch();

  const [minVal, setMinVal] = useState(tableRange[0]);
  const [maxVal, setMaxVal] = useState(tableRange[1]);

  useEffect(() => {
    if(!tableRange) return;
    setMinVal(tableRange[0]);
    setMaxVal(tableRange[1]);
  }, [tableRange]);

  const updateRedux = (min,max) => {
    dispatch(setTableRange([min,max]));  // correct now
  };

  return (
    <div className="flex flex-col  rounded-md p-2 w-full pb-6 pb-2">
          <div className='flex justify-start mb-auto items-center w-full px-2'>
            <h2 className="text-xl text-gray-700 leading-none">Table</h2>
    
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
        value={tableRange}
        onChange={(v)=>updateRedux(v[0],v[1])}
        allowCross={false}
         railStyle={{ background: "#000000", height: 5, borderRadius: 10 }}
        trackStyle={[{ background: "rgb(219, 175, 55)", height: 5, borderRadius: 10 }]}
        handleStyle={[
          { width: 15, height: 15, background: "rgb(219, 175, 55)", border: "none", borderRadius: "50%" },
          { width: 15, height: 15, background: "rgb(219, 175, 55)", border: "none", borderRadius: "50%" }
        ]} />

      <div className="flex justify-between gap-4 mt-4 w-full">
        <input type="number"
          value={minVal}
          onChange={(e) => setMinVal(e.target.value)}
          onBlur={() => updateRedux(+minVal,+maxVal)}
          className="w-1/2 border border-brand p-2 rounded" />
        <input type="number"
          value={maxVal}
          onChange={(e) => setMaxVal(e.target.value)}
          onBlur={() => updateRedux(+minVal,+maxVal)}
          className="w-1/2 border border-brand p-2 rounded" />
      </div>
    </div>
  );
};

export default TableFilter;
