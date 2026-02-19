import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDShapeSet } from '../store/slices/diamondFiltersSlices.js'
import diamondShapes from '../data/diamondShapes.js'
import tooltip from "../assets/tooltip.svg"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const DiamondShape = () => {
  const dispatch = useDispatch();
  const selectedDShapeSet = useSelector((state) => state.diamondFilters.filters.selectedDShapeSet);

  return (
    <div className="flex flex-col  rounded-md p-2 w-full pb-2">
      <div className='flex justify-start mb-auto items-center w-full px-2'>
        <h2 className="text-xl text-gray-700 leading-none">Diamond Shape</h2>

        <a
          data-tooltip-id="my-tooltip"
          data-tooltip-content="This filter allows you to select a ring shape"
          className='p-1 rounded-full cursor-pointer mt-1'
        >
          <img src={tooltip} className='w-5 h-5' />
        </a>
      </div>
      <div className='flex w-full overflow-x-auto gap-3 px-2 py-1'>
        {diamondShapes.map((shape) => (
          <div
            key={shape.id}
            onClick={() => dispatch(setDShapeSet(shape))}
             style={{
              display: 'flex',
              alignItems:'center',
            }}
            className={`
         flex-col items-center justify-center cursor-pointer 
        rounded-lg transition-all shrink-0 
        w-22 h-22                         
        p-2                               
        
        ${selectedDShapeSet?.id === shape.id
                ? "bg-gray-50 border-2 border-brand "   
                : "border-transparent"}                
        
        hover:shadow-md hover:scale-[1.03]
      `}
          >
            <img src={shape.img} className="w-4 h-4 object-contain mb-1" />
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
