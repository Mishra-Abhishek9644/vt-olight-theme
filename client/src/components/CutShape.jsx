import React from "react";
import Slider from "rc-slider";
import { useSelector, useDispatch } from "react-redux";
import { setCutRange } from "../store/slices/diamondFiltersSlices";
import "rc-slider/assets/index.css";
import tooltip from "../assets/tooltip.svg"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CutFilter = () => {
  const dispatch = useDispatch();
  const cutRange = useSelector(state => state.diamondFilters.filters.cutRange);

  const handleCutChange = (v) => dispatch(setCutRange(v));

  return (
    <div className="flex flex-col  rounded-md p-2 w-full pb-6">
      <div className='flex justify-start mb-auto items-center w-full px-2'>
        <h2 className="text-xl text-gray-700 leading-none">Cut</h2>

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
        max={3}
        step={1}
        value={cutRange}
        onChange={handleCutChange}
        allowCross={false}
        railStyle={{ background: "#000000", height: 5, borderRadius: 10 }}
        trackStyle={[{ background: "rgb(219, 175, 55)", height: 5, borderRadius: 10 }]}
        handleStyle={[
          { width: 15, height: 15, bottom: 0, background: "rgb(219, 175, 55)", border: "none", borderRadius: "50%" },
          { width: 15, height: 15, bottom: 0, background: "rgb(219, 175, 55)", border: "none", borderRadius: "50%" },
        ]}
        dots
        dotStyle={{
          background: "white",
          width: 1,
          height: 10,
          borderRadius: 0,
          marginTop: -7,
          bottom: -6, // centers the tick on the track
        }}

        activeDotStyle={{
          background: "white",
          width: 1,
          height: 10,
          borderRadius: 0,
        }}
        marks={{
          0: <span style={{ fontSize: 14, fontWeight: 600, color: "#000000" }}>Good</span>,
          1: <span style={{ fontSize: 14, fontWeight: 600, color: "#000000" }}>Very Good</span>,
          2: <span style={{ fontSize: 14, fontWeight: 600, color: "#000000" }}>Excellent</span>,
          3: <span style={{ fontSize: 14, fontWeight: 600, color: "#000000" }}>Rare</span>
        }}
      />
    </div>
  );
};

export default CutFilter;
