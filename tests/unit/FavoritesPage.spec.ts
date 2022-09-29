import FavoritesPage from "@/views/FavoritesPage.vue";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import sinon from "sinon";
import flushPromises from "flush-promises";
import { DataTypes } from "../../src/types/index";

const mockId = "liste";
const mockOldData: DataTypes[] = [
  {
    id: 1,
    name: "bulbusaur",
    sprites: {
      back_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
      back_female: null,
      back_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
      back_shiny_female: null,
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      front_female: null,
      front_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
      front_shiny_female: null,
      other: {
        dream_world: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
        },
      },
    },
  },
  {
    id: 2,
    name: "ivysaur",
    sprites: {
      back_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png",
      back_female: null,
      back_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/2.png",
      back_shiny_female: null,
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      front_female: null,
      front_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png",
      front_shiny_female: null,
      other: {
        dream_world: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg",
        },
      },
    },
  },
];
const mockNewData = {
  id: 2,
  name: "ivysaur",
  sprites: {
    back_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png",
    back_female: null,
    back_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/2.png",
    back_shiny_female: null,
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    front_female: null,
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png",
    front_shiny_female: null,
    other: {
      dream_world: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg",
      },
    },
  },
};
describe("FavoritesPage", () => {
  it("it render the favoritespage component", () => {
    const wrapper = mount(FavoritesPage);
    expect(wrapper.find(".cover").exists()).toBeTruthy();
  });
  beforeEach(() => {
    window.localStorage.clear();
  });

  const localStorageMock = (function () {
    interface Local {
      [key: string]: string; // key ve value ya type vermem gerekiyordu and i used an interface [key:string] and value :string. if value was a number type [key:string]:number would be.
    }

    let store: Local = {};

    return {
      getItem(key: string) {
        return store[key];
      },

      setItem(key: string, value: string) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key: string) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    };
  })();

  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  const setLocalStorage = (id: string, data: any) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };

  it("when the page landed there should be an empty array with liste key", () => {
    setLocalStorage("liste", []);
    expect(window.localStorage.getItem("liste")).toBe("[]");
  });

  it("data is added into local storage", () => {
    const mockJson = [
      {
        name: "ivysaur",
        sprites: {
          back_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png",
          back_female: null,
          back_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/2.png",
          back_shiny_female: null,
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
          front_female: null,
          front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png",
          front_shiny_female: null,
          other: {
            dream_world: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg",
            },
          },
        },
      },
    ];
    setLocalStorage(mockId, mockJson);
    const wrapper = mount(FavoritesPage);
    const h2 = wrapper.find("h2");
    expect(h2.text()).toEqual(mockJson[0].name.toUpperCase());
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });

  test("data in local storage is added", async () => {
    const mockId = "liste";
    const mockOldData = [{ data: "json data" }];
    const mockNewData = { data: " new data" };
    // const liste:Array<string> = [];
    await window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    const newData = JSON.parse(localStorage.getItem(mockId) || "[]");
    newData.push(mockNewData);
    window.localStorage.setItem(mockId, JSON.stringify(newData));
    expect(window.localStorage.getItem(mockId)).toEqual(
      JSON.stringify(newData)
    );
  });
  test("pushes new data to localstorage", async () => {
    const mockNewData = {
      id: 2,
      name: "ivysaur",
      sprites: {
        back_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png",
        back_female: null,
        back_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/2.png",
        back_shiny_female: null,
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
        front_female: null,
        front_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png",
        front_shiny_female: null,
        other: {
          dream_world: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg",
          },
        },
      },
    };
    // const liste:Array<string> = [];
    await window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    const newData = JSON.parse(localStorage.getItem(mockId) || "[]");
    newData.push(mockNewData);
    window.localStorage.setItem(mockId, JSON.stringify(newData));
    expect(window.localStorage.getItem(mockId)).toEqual(
      JSON.stringify(newData)
    );
  });
  test("data in local storage is exist", () => {
    // const deletefavorite = sinon.stub();
    setLocalStorage(mockId, mockOldData);
    const wrapper = mount(FavoritesPage);
    const h2 = wrapper.find("h2");
    console.log(h2);
    expect(h2.exists()).toBe(true);
  });

  it("removed data ", async () => {
    setLocalStorage(mockId, mockOldData);
    const wrapper = mount(FavoritesPage);
    const getData = window.localStorage.getItem(mockId);
    expect(wrapper.findAll(".container").length).toBe(2);
    const button = wrapper.get(".deleteSpan");
    await button.trigger("click");
    wrapper.vm.$nextTick();
    expect(wrapper.findAll(".container").length).toBe(1);
  });
  test("is data in local storage true", () => {
    const mockId = "liste";
    const mockData = {
      id: "1",
      name: "bulbusaur",
      sprites: {
        back_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
        back_female: null,
        back_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
        back_shiny_female: null,
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        front_female: null,
        front_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
        front_shiny_female: null,
      },
    };
    // const mockNewData = { data: " new data" };

    window.localStorage.setItem(mockId, JSON.stringify(mockData));
    expect(localStorage.getItem(mockId)).toContain(mockData.id);
    expect(localStorage.getItem(mockId)).toContain(
      JSON.stringify(mockData.sprites)
    );
    expect(localStorage.getItem(mockId)).toContain(mockData.name);
  });
});
