import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"
import { useDispatch, useSelector } from "react-redux";
import { setFlourRange } from "../store/slices/diamondFiltersSlices";
import tooltip from "../assets/tooltip.svg"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const FLUOR = ["None", "Faint", "Medium", "Strong"];

const Fluor = () => {
  const flourRange = useSelector(state => state.diamondFilters.filters.flourRange)
  const dispatch = useDispatch();

  const handleSlider = (value) => {
    dispatch(setFlourRange(value));
  };

  return (
    <div className="flex flex-col  rounded-md p-2 w-full pb-6 ">
      <div className='flex justify-start mb-auto items-center w-full px-2'>
        <h2 className="text-xl text-gray-700 leading-none">Flourence</h2>

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
        value={flourRange}
        onChange={handleSlider}
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
        marks={FLUOR.reduce((acc, c, i) => {
          acc[i] = <span style={{ fontSize: 14, fontWeight: 600, color: "#000000" }}>{c}</span>;
          return acc;
        }, {})}
      />


    </div>
  );
};

export default Fluor;
