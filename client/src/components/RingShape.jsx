import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setShape } from '../store/slices/diamondFiltersSlices.js'
import ringshapes from "../data/ringshape.js"
import tooltip from "../assets/tooltip.svg"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const RingShape = () => {
  const dispatch = useDispatch();
  const selectedShape = useSelector(state => state.diamondFilters.filters.selectedShape);

  return (
    <div className='flex flex-col justify-center items-start p-2  rounded-md w-full text-sm text-gray-900'>

      <div className='flex justify-start mb-auto items-center w-full px-2'>
        <h2 className='text-xl text-gray-700 mb-1'>Ring Shape</h2>

        {/* Tooltip icon */}
        <a
          data-tooltip-id="my-tooltip-ring"
          data-tooltip-content="Select your ring shape type"
          className='p-1 rounded-full cursor-pointer'
        >
          <img src={tooltip} className='w-5 h-5' />
        </a>

        <Tooltip id="my-tooltip-ring" place="top" />
      </div>

      {/* Shapes */}
      <div className="flex overflow-x-auto gap-3 items-center px-2 py-1">
        {ringshapes.map(shape => (
          <div
            key={shape.id}
            onClick={() => dispatch(setShape(shape))}
            style={{
              display: 'flex',
              alignItems:'center',
            }}
            className={`
               flex-col items-center justify-center cursor-pointer rounded-lg transition-all shrink-0 w-24 h-28 p-2    
              ${selectedShape?.id === shape.id
                ? "border-2 border-brand bg-gray-50"
                : "border-transparent"}
              hover:scale-[1.03] hover:shadow-md
            `}
          >
            <img src={shape.img} className="w-16 h-16  object-contain mb-1 invert" />
            <p className="text-xs font-medium text-center px-1 leading-tight">
              {shape.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RingShape;
