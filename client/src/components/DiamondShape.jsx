import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDShape } from '../store/slices/diamondFiltersSlices.js'
import diamondShapes from '../data/diamondShapes.js'
import tooltip from "../assets/tooltip.svg"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const DiamondShape = () => {
  const dispatch = useDispatch();
  const selectedDShape = useSelector((state) => state.diamondFilters.filters.selectedDShape);

  return (
    <div className='flex flex-col justify-center items-start p-2  rounded-md w-full text-sm text-gray-900'>
      <div className='flex justify-start items-center w-full  px-2'>
        <h2 className='text-xl text-gray-700 mb-1'>Diamond Shape</h2>

        <a
          data-tooltip-id="my-tooltip"
          data-tooltip-content="This filter allows you to select a ring shape"
          className='p-1 rounded-full cursor-pointer'
        >
          <img src={tooltip} className='w-5 h-5' />
        </a>
        {/* Tooltip Component */}
        <Tooltip id="my-tooltip" place="top" />
      </div>
      <div className='flex w-full overflow-x-auto gap-3 px-2 py-1'>
        {diamondShapes.map((shape) => (
          <div
            key={shape.id}
            onClick={() => dispatch(setDShape(shape))}
             style={{
              display: 'flex',
              alignItems:'center',
            }}
            className={`
         flex-col items-center justify-center cursor-pointer 
        rounded-lg transition-all shrink-0 
        w-22 h-25                          
        p-2                               
        
        ${selectedDShape?.id === shape.id
                ? "border-2 border-brand bg-gray-50"   
                : "border-transparent"}                
        
        hover:shadow-md hover:scale-[1.03]
      `}
          >
            <img src={shape.img} className="w-12 h-12 object-contain mb-1" />
            <p className="text-center text-sm font-medium px-1 leading-tight">
              {shape.name}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default DiamondShape
