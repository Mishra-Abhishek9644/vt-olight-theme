import React, { useState } from 'react'
import cardview from "../assets/cardview.svg"
import gridview from "../assets/gridview.svg"
import { useSelector, useDispatch } from 'react-redux'
import { setSort } from '../store/slices/diamondFiltersSlices'
import Card from './Card'
import { Link } from 'react-router-dom'

const CardSort = () => {
  const [isCard, setIsCard] = useState(true);
  const [sort, setSortState] = useState('')
  const dispatch = useDispatch()

  const handleSort = (value) => {
    setSortState(value)
    dispatch(setSort(value))
  }

  return (
    <>
      <div
        // ⬇ CHANGE #1: grid becomes 1-col on mobile, 2-col on md+
        className='grid grid-cols-1 md:grid-cols-2 m-1 p-2 items-center'
      >

        {/* ⬇ CHANGE #2: hidden on mobile, visible only on md+ */}
        <div className='hidden md:flex flex-col'>
          <span className='text-brand text-xl font-semibold p-1'>Round Natural Diamond</span>
          <p className='text-sm p-1'>Shop Certified Natural Diamonds 277,856 Conflict-Free Natural Diamonds</p>
        </div>

        {/* Buttons section → now fully visible on mobile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: "fit"
          }}
          className="ml-auto  items-center w-full md:w-auto justify-between md:justify-end gap-2 flex-nowrap">

          {/* SORT BOX */}
          <div className="border-2 border-brand rounded-xl px-0.5 md:px-3  items-center h-12 min-w-[130px] shrink-0">
            <label className="text-brand font-semibold mr-0 md:mr-1 ">Sort :</label>
            <select
              name="TypeofDiamonds"
              value={sort}
              onChange={(e) => handleSort(e.target.value)}
              className="text-brand bg-transparent border-none focus:outline-none text-xs md:text-sm"
            >
              <option value="Best">Best</option>
              <option value="Latest">Latest</option>
              <option value="PriceLow">Low → High</option>
              <option value="PriceHigh">High → Low</option>
            </select>
          </div>

          {/* CARD & GRID BUTTONS */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width:"fit"
            }}
            className=" items-center gap-2 h-12">

            <button
              onClick={() => setIsCard(true)}
              className={`h-12 w-12 flex items-center justify-center rounded-lg border-2 transition-all   ${isCard ? "border-brand" : "border-transparent"
                }`}
            >
              <img src={cardview} className="w-7 h-7 m-1 hover:scale-105" alt="card view" />
            </button>

            <button
              onClick={() => setIsCard(false)}
              className={`h-12 w-12 flex items-center justify-center rounded-lg border-2 transition ${!isCard ? "border-brand" : "border-transparent"
                }`}
            >
              <img src={gridview} className="w-7 h-7 m-1 hover:scale-105" alt="grid view" />
            </button>

          </div>
        </div>
      </div>
      <Card isCard={isCard} />

    </>
  )
}

export default CardSort
