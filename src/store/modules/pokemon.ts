import axios from "axios";
export interface StateProps {
  datalist?: [];
  favorites?: [];
  commit?: any;
}
const state = {
  datalist: [],
  favorites: [],
};

const getters = {
  // to get this state in the components
  allDataList: (state: StateProps) => state.datalist,
  allfavorites: (state: StateProps) => state.favorites,
};

const actions = {
  async fetchPokemon({ commit }: StateProps) {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50"
    );
    console.log(response.data.results);
    commit("setData", response.data.results);
  },
  async addFavorites({ commit }: StateProps, dataEach: []) {
    // console.log(this.favorites);
    commit("setFavorite", dataEach);
  },
};
const mutations = {
  setData: (state: any, res: any) => (state.datalist = res),
  setFavorite: (state: any, dataEach: any) => {
    if (!state.favorites.some((item: any) => item.id === dataEach.id)) {
      state.favorites.unshift(dataEach);
      console.log(state.favorites);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
