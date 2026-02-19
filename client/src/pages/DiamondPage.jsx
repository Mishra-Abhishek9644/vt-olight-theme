import Diamondfilter from '../components/Diamondfilter';
import CardSort from '../components/CardSort';
import { useSelector, useDispatch } from "react-redux";
import { clearDiamond, clearSetting } from '../store/slices/cartSlice.js'
import { Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from 'react'

const DiamondPage = () => {
    const [Natural, setNatural] = useState(true);
    const [LabGrown, setLabGrown] = useState(false);

    const dispatch = useDispatch()
      const navigate = useNavigate()
    
      const selectedDiamond = useSelector(
        (state) => state.cart.selectedDiamond);
    
      const selectedSetting = useSelector(
        (state) => state.cart.selectedSetting);

        useEffect(() => {
            if (selectedDiamond ) {
              navigate('/settings')
            }
            if(selectedDiamond && selectedSetting){
                navigate('/complete')
            }
            
          }, [selectedDiamond,selectedSetting])

    return (
        <div className='sm:container-sm md:container-md lg:container-lg '>
            <div className='flex justify-evenly items-center mb-5 bg-gray-200 max-w-xl md:max-w-2xl w-full mx-auto p-1 rounded-md lg:gap-4'>                
                <button className={`flex justify-center items-center p-1  w-full rounded-md  ${Natural ? 'bg-brand p-2 text-white' : 'bg-transparent text-gray-500'} `} onClick={(e) => {
                setNatural(true);
                setLabGrown(false);
            }}>
                <div className='text-sm sm:text-base md:text-md lg:text-xl  pr-1'>💎</div>
                 <div className='text-base md:text-md lg:text-xl'>Natural Diamonds</div>
            </button>
                <button className={`flex justify-center items-center p-1 w-full rounded-md ${LabGrown ? 'bg-brand p-2 text-white' : 'bg-transparent text-gray-500'} `} onClick={(e) => {
                    setNatural(false);
                    setLabGrown(true);
                }}><div className='text-base md:text-md lg:text-xl pr-1'>💎</div>
                    <div className='text-base md:text-md lg:text-xl'>
                        Lab Grown Diamonds
                    </div>
                </button>
            </div>
            <Diamondfilter />
            <CardSort />
        </div>
    )
}

export default DiamondPage