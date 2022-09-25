import axios from "axios";
export interface StateProps {
  datalist?: [];
  favorites?: [];
}
const state = {
  datalist: [],
  favorites: [],
};
const getters = {
  // to get this state in the components
  allDataList: (state: any) => state.datalist,
  allfavorites: (state: any) => state.favorites,
};

const actions = {
  async fetchPokemon({ commit }: any) {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10"
    );
    console.log(response.data.results);
    commit("setData", response.data.results);
  },
  async addFavorites({ commit }: any, dataEach: []) {
    // console.log(this.favorites);
    commit("setFavorite", dataEach);
  },
};
const mutations = {
  setData: (state: any, res: any) => (state.datalist = res),
  setFavorite: (state: any, dataEach: any) => {
    if (!state.favorites.some((item: any) => item.id === dataEach.id)) {
      state.favorites.unshift(dataEach);
      // localStorage.setItem("liste", JSON.stringify(dataEach));
      console.log(state.favorites);
    }
  },
};
//  mutations: {
//     setAll(state, data){
//       state.all = data;
//     }
//   },
//   actions: {
//     setAll({commit}, data){
//       commit('setAll',data);
//     }
//   },
export default {
  state,
  getters,
  mutations,
  actions,
};
