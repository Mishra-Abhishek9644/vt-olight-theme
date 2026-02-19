import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMetalSet } from "../store/slices/diamondFiltersSlices.js"

import white14 from "../assets/whitegold.svg"
import white18 from "../assets/whitegold.svg"
import rose14 from "../assets/rosegold.svg"
import rose18 from "../assets/rosegold.svg"
import gold14 from "../assets/gold.svg"
import gold18 from "../assets/gold.svg"
import tooltip from "../assets/tooltip.svg"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const OPTIONS = [
    { id: 1, src: white14, label: '14k', description: '14KT White Gold' },
    { id: 2, src: white18, label: '18k', description: '18KT White Gold' },
    { id: 3, src: rose14, label: '14k', description: '14KT Rose Gold' },
    { id: 4, src: rose18, label: '18k', description: '18KT Rose Gold' },
    { id: 5, src: gold14, label: '14k', description: '14KT Yellow Gold' },
    { id: 6, src: gold18, label: '18k', description: '18KT Yellow Gold' },
];


const Metal = () => {

    //  Redux state 🟢 (persistent)
    const selectedMetal = useSelector(state => state.diamondFilters.filters.selectedMetalSet)
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col  rounded-md p-2 w-full pb-6 ">
            <div className='flex justify-start mb-auto items-center w-full px-2'>
                <h2 className="text-xl text-gray-700 leading-none">Metals</h2>

                <a
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="This filter allows you to select a ring shape"
                    className='p-1 rounded-full cursor-pointer mt-1'
                >
                    <img src={tooltip} className='w-5 h-5' />
                </a>
            </div>

            <div className="flex gap-5 overflow-x-auto whitespace-nowrap px-1 w-full mt-1 scrollbar-hide">

                {OPTIONS.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => dispatch(setMetalSet(option))}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        className={`relative  flex-col items-center cursor-pointer shrink-0 p-2 rounded-md
                            transition`}
                    >

                        {/* Label Badge */}
                        <span className="absolute bottom-6 text-sm  px-1 font-semibold">
                            {option.label}
                        </span>

                        <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${selectedMetal?.id === option.id
                                    ? "border-brand bg-gray-50"
                                    : "border-transparent"
                                }`}
                        >
                            <img
                                src={option.src}
                                className="w-12 h-12 object-contain"
                            />
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Metal
