import React from 'react'
import Nav from '../components/Nav'
import product from '../assets/product.svg'
import truck from '../assets/truck.svg'
import diamonds from '../data/diamondShapes.js'
import ringshapes from '../data/ringshape.js'
import { useSelector, useDispatch } from "react-redux";
import { clearDiamond, clearSetting } from '../store/slices/cartSlice.js'
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react'


const CompletePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectedDiamond = useSelector(
    (state) => state.cart.selectedDiamond);

  const selectedSetting = useSelector(
    (state) => state.cart.selectedSetting);

     const handleRemoveDiamond = () => {
    dispatch(clearDiamond());
    // send user back to diamond page so they can choose again
    navigate('/diamond');
  };

  const handleRemoveSetting = () => {
    dispatch(clearSetting());
    // send user to settings page so they can choose again
    navigate('/settings');
  };

  const total = Number(selectedDiamond?.price) + Number(selectedSetting?.price);

  useEffect(() => {
    if (!selectedDiamond ) {
      navigate('/diamond')
    }
     
    if (!selectedSetting ) {
      navigate('/settings')
    }
    
  }, [selectedDiamond,selectedSetting])
  


  return (
    <div className='container-lg mt-5'>
      <div className="grid grid-cols-3 items-start mb-0">

        {/* LEFT HEADING */}
        <div className='col-span-2'>
          <h1 className="text-xl text-brand mb-1">My Cart (2 items)</h1>
          <h2 className="text-md text-gray-700">Engagement Ring (Completed)</h2>
        </div>

        {/* RIGHT HEADING */}
        <h2 className="hidden md:inline-block col-span-1 text-lg text-brand font-semibold mt-auto ml-3">
          Order Summary
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-0 p-0">

        <div className="col-span-2 bg-white border border-gray-300 p-4 flex-col h-fit">
          {selectedDiamond &&
            (<div className='flex m-0 p-0'>

              <div className='w-1/3 p-1'><img  src={selectedDiamond?.image || product} alt={selectedDiamond?.sku || 'Select a Diamond'} className='w-full object-contain h-auto md:h-40 p-4 border border-gray-300' /></div>
              <div className='w-2/3 flex flex-col gap-1 m-1 ml-4'>
                <h2 className='text-md md:text-xl font-semibold'>  {selectedDiamond?.carat + "Carat"} {selectedDiamond?.shape + " Natural Diamond"}</h2>
                {/* <p className='text-md md:text-xl text-gray-800'>LOLA DIAMOND ENGAGEMENT RING, WHITE GOLD 14K</p> */}
                <div className='flex my-2 gap-3 items-center'><p className='text-2xl text-brand font-semibold'>{selectedDiamond?.currency_symbol}{selectedDiamond?.price}</p></div>
                <div className='flex items-center gap-2 my-1'><img src={truck} alt="" />Add free engraving</div>
                <div className='flex justify-start gap-3 text-brand items-center w-2/3 text-xl mt-5 cursor-pointer'>
                  <Link to={`/diamond/${selectedDiamond?.sku || ""}`}><button className=' mx-1 hover:scale-105 cursor-pointer'>View</button></Link>
                  <p className='text-gray-700'>|</p>
                 <button className='hover:scale-105 hover:cursor-pointer' onClick={() => dispatch(handleRemoveDiamond)}>Remove</button>
                </div>
              </div>

            </div>)}
          {selectedSetting && (
            <div className='flex m-0 p-0'>

              <div className='w-1/3 p-1'><img  src={selectedSetting?.image || product} alt={selectedSetting?.id || 'Select a Diamond'} className='w-full h-auto md:h-40 p-4 border border-gray-300 object-contain' /></div>
              <div className='w-2/3 flex flex-col gap-1 m-1 ml-4'>
                <h2 className='text-md md:text-xl font-semibold'>  {(selectedSetting?.title)}</h2>
                {/* <p className='text-md md:text-xl text-gray-800'>LOLA DIAMOND ENGAGEMENT RING, WHITE GOLD 14K</p> */}
                <div className='flex my-2 gap-3 items-center'><p className='text-2xl text-brand font-semibold'>{selectedSetting?.currency_symbol}{selectedSetting?.price}</p></div>
                <div className='flex items-center gap-2 my-1'><img src={truck} alt="" />Add free engraving</div>
                <div className='flex justify-start gap-3 text-brand items-center w-2/3 text-xl mt-5 '>
<Link to={`/settings/${selectedSetting?.id || ""}`}><button className=' mx-1 hover:scale-105 cursor-pointer'>View</button></Link>                  <p className='text-gray-700'>|</p>
                 <button className='hover:scale-105 hover:cursor-pointer' onClick={() => dispatch(handleRemoveSetting)}>Remove</button>
                </div>
              </div>

            </div>)}
        </div>
        {/*Smaller Column*/}

        <div className="col-span-1 m-0 p-0 h-fit">
          <div className="bg-white border border-gray-300  p-5 space-y-5 text-sm">

            {/* -- Top Price Section -- */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <p>Subtotal</p>

                <p className="font-semibold">{selectedDiamond?.currency_symbol}{total}</p>
              </div>

              <div className="flex justify-between">
                <p className="flex items-center gap-1">
                  Shipping <span className="text-brand text-xs">ⓘ</span>
                </p>
                <p className="font-medium text-green-600">Free</p>
              </div>

              <div className="flex justify-between">
                <p className="flex items-center gap-1">
                  Tax <span className="text-brand text-xs">ⓘ</span>
                </p>
                <p>Calculated at next step</p>
              </div>
            </div>

            <hr />

            {/* Apply Discount Code */}

            {/* Main Purple Button */}
            <button className="w-full bg-brand text-white py-3 rounded-lg font-medium text-base my-1">
              Procced To CheckOut
            </button>




            {/* Buttons */}


            <button className="w-full bg-brand text-white py-3 rounded-md font-medium flex items-center justify-center gap-2 my-1">
              🧊 Book a Virtual Consultation
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CompletePage