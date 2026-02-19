import React, { useState } from 'react'
import RingShape from './RingShape'
import DiamondShape from './DiamondShape'
import CutShape from './CutShape'
import Carats from './Carats';
import Color from './Color';
import Clarity from './Clarity';
import Price from './Price';
import Sym from './Sym';
import TableFilter from './TableFilter';
import LWFilter from './LWFilter';
import Polish from './Polish';
import Fluor from './Fluor';
import Depth from './Depth';
import { useDispatch } from 'react-redux';
import { resetDiamondFilters } from '../store/slices/diamondFiltersSlices'
const Diamondfilter = () => {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col justify-center items-center m- 1 p-1 space-y-4 w-full'>

      <RingShape />

      <DiamondShape />

      <div className="mb-4 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
          <div className=" bg-white rounded-md p-4  mb-4">
            <CutShape />
          </div>

          <div className=" bg-white rounded-md p-4  mb-4">
            <Carats />
          </div>
          <div className=" bg-white rounded-md p-4  mb-4">
            <Color />
          </div>
          {showAdvanced && (
            <><div className=" bg-white rounded-md p-4  mb-4">
              <Sym />
            </div><div className=" bg-white rounded-md p-4  mb-4">
                <TableFilter />
              </div>
              <div className=" bg-white rounded-md p-4  mb-4">
                <LWFilter />
              </div></>
          )}
        </div>

        <div className="w-full">
          <div className=" bg-white rounded-md p-4  mb-3.5  ">
            <Clarity />
          </div><div className=" bg-white rounded-md p-4  mb-3.5 ">
            <Price />
          </div>
          {showAdvanced && (
            <div className="">
              <div className=" bg-white rounded-md p-4  mb-3.5 ">
                <Polish />
              </div>
              <div className=" bg-white rounded-md p-4  mb-3.5 ">
                <Fluor />
              </div>
              <div className=" bg-white rounded-md p-4  mb-3.5 ">
                <Depth />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-end items-center w-full'>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className='text-white bg-brand p-3 m-1 text-xl rounded-md hover:scale-105'
        >
          {showAdvanced ? "Hide Advanced Filters ▲" : "Show Advanced Filters ▼"}
        </button>

        <button
          onClick={() => dispatch(resetDiamondFilters())}
          className='text-white bg-brand p-3 m-1 text-xl rounded-md hover:scale-105'
        >
          Reset Filters
        </button>

      </div>


    </div>
  );
};


export default Diamondfilter