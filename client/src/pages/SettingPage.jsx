import CardSortSet from '../components/CardSortSet';
import PriceSet from '../components/PriceSet';
import DiamondShapeSet from '../components/DiamondShapeSet';
import RingShapeSet from '../components/RingShapeSet';
import { resetSettingFilters } from '../store/slices/diamondFiltersSlices';
import Metal from '../components/Metal';
import 'react-tooltip/dist/react-tooltip.css'
import { useSelector, useDispatch } from "react-redux";
import { clearDiamond, clearSetting } from '../store/slices/cartSlice.js'
import { Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from 'react'


const SettingPage = () => {
    const [Natural, setNatural] = useState(true);
    const [LabGrown, setLabGrown] = useState(false);

     const dispatch = useDispatch()
      const navigate = useNavigate()
    
      const selectedDiamond = useSelector(
        (state) => state.cart.selectedDiamond);
    
      const selectedSetting = useSelector(
        (state) => state.cart.selectedSetting);

        useEffect(() => {
            if (selectedSetting ) {
              navigate('/diamond')
            }
             
            if (selectedSetting && selectedDiamond ) {
              navigate('/complete')
            }

            //  if (!selectedDiamond ) {
            //   navigate('/diamond')
            // }

            
          }, [selectedDiamond,selectedSetting])

        //  useEffect(() => {
        //    if (!selectedDiamond ) {
        //       navigate('/diamond')
        //     }
        //  },[])
         

    return (
        <div className='container-7xl mt-5'>

            <div className='grid grid-cols-1 md:grid-cols-2 '>
                <div className='m-1 flex flex-col gap-3'>
                    <div className=' bg-white rounded-md p-4  mb-3.5 '><div>
                    </div> <RingShapeSet /></div>
                    <div className=' bg-white rounded-md p-4  mb-3.5 '><PriceSet /></div>
                </div>
                <div className='m-1 flex flex-col gap-3'>
                    <div className=' bg-white rounded-md p-4  mb-3.5 '><DiamondShapeSet /></div>
                    <div className=' bg-white rounded-md p-4  mb-3.5 '><Metal /></div>

                </div>
            </div>
            <div className='flex justify-end items-center'>
                <button onClick={() => dispatch(resetSettingFilters())}
                    className='text-white bg-brand p-3 m-1 text-xl rounded-md hover:scale-105'>Reset Filters</button>
            </div>
            <CardSortSet />
        </div>
    )
}

export default SettingPage