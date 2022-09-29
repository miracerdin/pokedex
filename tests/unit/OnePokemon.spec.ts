import { mount } from "@vue/test-utils";
import OnePokemon from "@/views/OnePokemon.vue";
import axios from "axios";

describe("OnePokemon.vue", () => {
  jest.mock("axios");
  interface MockTypes {
    name?: string;
    url?: string;
    sprites?: object;
  }

  const MockData: MockTypes = {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
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
  };

  jest.spyOn(axios, "get").mockResolvedValue({ data: MockData });
  it("should mount a page or view", () => {
    const wrapper = mount(OnePokemon, {
      props: {
        data: String,
      },
      data() {
        return {
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        };
      },
    });

    expect(wrapper.exists()).toBe(true);
    //   describe("when API call is successful", () => {
    //     it("should return pokemon list", async () => {
    //       // given
    //       const get = jest
    //         .spyOn(axios, "get")
    //         .mockResolvedValue({ data: MockData });

    //       // when
    //       const result = await fetchUsers();

    //       // then
    //       expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
    //       expect(result).toEqual(users);
    //     });
  });
});
