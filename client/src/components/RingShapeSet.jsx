import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setShapeSet } from '../store/slices/diamondFiltersSlices.js'
import ringshapes from "../data/ringshape.js"
import tooltip from "../assets/tooltip.svg"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";


const RingShapeSet = () => {
  const dispatch = useDispatch();
  const selectedShapeSet = useSelector(
    (state) => state.diamondFilters.filters.selectedShapeSet
  );

  return (
    <div className="flex flex-col  rounded-md p-2 w-full pb-6 pb-2">
      <div className='flex justify-start mb-auto items-center w-full px-2'>
        <h2 className="text-xl text-gray-700 leading-none">Ring Shape</h2>

        <a
          data-tooltip-id="my-tooltip"
          data-tooltip-content="This filter allows you to select a ring shape"
          className='p-1 rounded-full cursor-pointer mt-1'
        >
          <img src={tooltip} className='w-5 h-5' />
        </a>
      </div>{/* Shapes */}
      <div className="flex overflow-x-auto gap-3 w-full px-2 py-1">
        {ringshapes.map(shape => (
          <div
            key={shape.id}
            onClick={() => dispatch(setShapeSet(shape))}
             style={{
              display: 'flex',
              alignItems:'center',
            }}
            className={`
               flex-col items-center justify-center cursor-pointer 
              rounded-lg transition-all shrink-0
              w-22 h-25      
              p-2             
              ${selectedShapeSet?.id === shape.id
                ? "border-2 border-brand bg-gray-50"
                : "border-transparent"}
              hover:scale-[1.03] hover:shadow-md
            `}
          >
            <img src={shape.img} className="w-10 h-10 object-contain mb-1" />
            <p className="text-xs font-medium text-center px-1 leading-tight">
              {shape.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RingShapeSet