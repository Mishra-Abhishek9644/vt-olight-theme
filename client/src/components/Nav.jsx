import React from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setDiamond, setSetting, clearDiamond, clearSetting } from '../store/slices/cartSlice';
import { toast } from "react-toastify"

const Nav = () => {

  const selectedDiamond = useSelector(state => state.cart.selectedDiamond)
  const selectedSetting = useSelector(state => state.cart.selectedSetting)
  const dispatch = useDispatch()

  const location = useLocation()
  console.log("PATH:", location.pathname)
  const isDiamondActive = location.pathname.startsWith("/diamond")
  return (

    <div>
      <h1 className='text-brand font-weight-500 p-3 pl-0 text-xl sm:text-2xl md:text-3xl'>
        <NavLink to='/'
          onClick={(e) =>
            selectedDiamond && (e.preventDefault(), toast.error("Remove diamond to select new diamond"))
          }

        >Ring Builder</NavLink>
      </h1>

      <div className="flex w-full shadow-md overflow-hidden text-xs sm:text-sm md:text-base">
        {/* 👆 Base mobile font small → scales up on bigger screens */}

        {/* ========== DIAMOND TAB ========== */}

        <NavLink
          to="/diamond"
          onClick={(e) =>
            selectedDiamond && (e.preventDefault(), toast.error("Remove diamond to select new diamond"))
          } className={`flex-1 flex items-center justify-between gap-2 p-2 sm:p-3 text-black
    ${isDiamondActive ? "bg-brand " : "bg-white "}`}
        >
          <div className='flex items-center gap-2'>

            {/* 🔽 Smaller emojis on mobile */}
            <div className="text-lg sm:text-xl md:text-3xl">💎</div>

            <div>
              <p className="font-semibold text-sm sm:text-base">Diamond</p>
              <p className="hidden md:block text-xs">Choose your diamond</p>
            </div>
          </div>

          {selectedDiamond && (
            <div className="hidden md:block text-xl mx-1">|</div>)}

          <div className="hidden md:block pr-2">
            <p className="font-semibold">{selectedDiamond?.currency_symbol}{selectedDiamond?.price}</p>
            {selectedDiamond && (
              <div className="text-xs hover:cursor-pointer"><Link to={`/diamond/${selectedDiamond?.sku || ""}`}><button className=' mx-1 hover:scale-105 cursor-pointer'>View</button></Link>
                |
                <Link to="/diamond"> <button className=' mx-1 hover:scale-105 cursor-pointer'
                  onClick={() => {
                    dispatch(clearDiamond())
                    toast.warn("Diamond Removed")
                  }}>Remove</button></Link>
              </div>)}
          </div>
        </NavLink>
        {/* ========== SETTINGS TAB ========== */}
        <NavLink
          to="/settings"

          onClick={(e) =>
            selectedSetting && (e.preventDefault(), toast.error("Remove setting to select new setting"))
          }
          className={({ isActive }) =>
            `flex-1 flex items-center justify-between gap-2 p-2 sm:p-3 text-black ${isActive ? "bg-brand " : "bg-white "
            }`
          }
        >
          <div className='flex items-center gap-2'>
            <div className="text-lg sm:text-xl md:text-3xl">💍</div>
            <div>
              <p className="font-semibold text-sm sm:text-base">Settings</p>
              <p className="hidden md:block text-xs">Choose your Setting</p>
            </div>
          </div>

          {selectedSetting && (
            <div className="hidden md:block text-xl mx-1">|</div>)}

          <div className="hidden md:block pr-2">
            <p className="font-semibold">{selectedSetting?.currency_symbol}{selectedSetting?.price}</p>
            {selectedSetting && (
              <div className="text-xs hover:cursor-pointer"><Link to={`/settings/${selectedSetting?.id || ""}`}><button className='cursor pointer mx-1 hover:scale-105 cursor-pointer'>View</button></Link>
                |
                <Link to="/settings">  <button className='cursor pointer mx-1 hover:scale-105 cursor-pointer'
                  onClick={() => {
                    dispatch(clearSetting())
                    toast.warn("Setting Removed")
                  }}>Remove</button></Link>
              </div>)}
          </div>
        </NavLink>


        {/* ========== COMPLETE TAB ========== */}
        <NavLink
          to="/complete"
          onClick={(e) => {
            // if either item missing, block click
            if (!(selectedDiamond && selectedSetting)) {
              e.preventDefault();
              toast.error("Please select diamond and setting first!")
            }
          }} className={({ isActive }) =>
            `flex-1 flex items-center gap-2 p-2 sm:p-3 text-black ${isActive ? "bg-brand " : "bg-white "
            }`
          }
        >
          <div className="text-xl sm:text-2xl md:text-3xl">🎁</div>
          <div>
            <p className="font-semibold text-sm sm:text-base">
              <span className="md:hidden">Ring</span>          {/* Visible only on mobile */}
              <span className="hidden md:inline">Complete Ring</span> {/* Visible on md+ */}
            </p>
            <p className="text-xs hidden md:block">Review your ring</p>
          </div>
        </NavLink>

      </div>
    </div>

  );
};

export default Nav;
