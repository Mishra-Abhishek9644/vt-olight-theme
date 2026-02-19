import { createSlice } from "@reduxjs/toolkit";

const defaultFilters = {
  selectedShape: null,
  selectedDShape: null,

  // DiamondPage Filters
  cutRange: [0, 3],
  caratRange: [0.1, 30],
  colorRange: [0, 8],
  clarityRange: [0, 7],
  priceRange: [1, 100000],
  symRange: [0, 4],
  tableRange: [1, 100],
  lwRange: [1, 100],
  polishRange: [0, 4],
  flourRange: [0, 3],
  depthRange: [1, 100],
  sort: "",

  // SettingPage Filters
  selectedShapeSet: null,
  selectedDShapeSet: null,
  priceRangeSet: [1, 100000],
  selectedMetalSet: { label:'', description:'' }, // 👈 clean storage
};


// ================== INIT (persistent) ==================
const initialState = {
  filters: JSON.parse(localStorage.getItem("diamondFilters")) || defaultFilters,
};


const diamondFiltersSlice = createSlice({
  name: "diamondFilters",
  initialState,
  reducers: {

    // -------- Diamond Page --------
    setShape: (s,a)=>{s.filters.selectedShape = a.payload},
    setDShape:(s,a)=>{s.filters.selectedDShape=a.payload},
    setCarat:(s,a)=>{s.filters.caratRange=a.payload},
    setCutRange:(s,a)=>{s.filters.cutRange=a.payload},
    setColorRange:(s,a)=>{s.filters.colorRange=a.payload},
    setClarityRange:(s,a)=>{s.filters.clarityRange=a.payload},
    setPriceRange:(s,a)=>{s.filters.priceRange=a.payload},
    setSymRange:(s,a)=>{s.filters.symRange=a.payload},
    setTableRange:(s,a)=>{s.filters.tableRange=a.payload},
    setLWRange:(s,a)=>{s.filters.lwRange=a.payload},
    setPolishRange:(s,a)=>{s.filters.polishRange=a.payload},
    setFlourRange:(s,a)=>{s.filters.flourRange=a.payload},
    setDepthRange:(s,a)=>{s.filters.depthRange=a.payload},
    setSort:(s,a)=>{s.filters.sort=a.payload},

    // -------- Settings Page --------
    setShapeSet:(s,a)=>{s.filters.selectedShapeSet=a.payload},
    setDShapeSet:(s,a)=>{s.filters.selectedDShapeSet=a.payload},
    setPriceRangeSet:(s,a)=>{s.filters.priceRangeSet=a.payload},
    setMetalSet:(s,a)=>{s.filters.selectedMetalSet=a.payload},


    // =============== RESET ZONES ===============

    // Diamond Page Only
    resetDiamondFilters:(state)=>{
      state.filters = {
        ...state.filters,
        cutRange:[0,3], caratRange:[0.1,30], colorRange:[0,8], clarityRange:[0,7],
        priceRange:[1,100000], symRange:[0,4], tableRange:[1,100], lwRange:[1,100],
        polishRange:[0,4], flourRange:[0,3], depthRange:[1,100], sort:'',
        selectedShape:null, selectedDShape:null,
        selectedMetalSet:{ label:'',description:'' } // FIXED ✔
      }
    },

    // Settings Page Only
    resetSettingFilters:(state)=>{
      state.filters = {
        ...state.filters,
        selectedShapeSet:null,
        selectedDShapeSet:null,
        priceRangeSet:[1,100000],
        selectedMetalSet:{label:'',description:''}  // FIXED ✔
      }
    },

    resetAllFilters:(state)=>{
      state.filters = defaultFilters
      localStorage.removeItem("diamondFilters")
    }
  }
});

export const {
  setShape,setDShape,setCarat,setCutRange,setColorRange,setClarityRange,setPriceRange,
  setSymRange,setTableRange,setLWRange,setPolishRange,setFlourRange,setDepthRange,
  setSort,setShapeSet,setDShapeSet,setPriceRangeSet,setMetalSet,
  resetDiamondFilters,resetSettingFilters,resetAllFilters
} = diamondFiltersSlice.actions;

export default diamondFiltersSlice.reducer;
