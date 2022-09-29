import {
  createLocalVue,
  mount,
  RouterLinkStub,
  shallowMount,
  Wrapper,
} from "@vue/test-utils";
import OnePokemon from "@/views/OnePokemon.vue";
import axios from "axios";
import flushPromises from "flush-promises";
import MockData from "../../src/mocks";
import routes from "../../src/router/index";
import VueRouter from "vue-router";
import DetailPage from "@/views/DetailPage.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("OnePokemon.vue", () => {
  let wrapper: Wrapper<OnePokemon>;

  beforeEach(async () => {
    // (axios.get as jest.Mock).mockImplementationOnce(() =>
    //   Promise.resolve({ data: MockData })
    // );
    mockedAxios.get.mockRejectedValue("error");
    mockedAxios.get.mockResolvedValue({ data: { ...MockData } });
    wrapper = shallowMount(OnePokemon, {
      props: {
        data: String,
      },
      data() {
        return {
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        };
      },
    });
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

  it("should mount a page or view", () => {
    expect(wrapper.exists()).toBe(true);
    console.log(wrapper.html());
  });
  it("Add favs button should work", async () => {
    setLocalStorage("liste", []);
    await flushPromises();
    expect(wrapper.find(".imgDiv").exists()).toBe(true);
    await flushPromises();
    wrapper.find(".addFavoriteFunc").trigger("click");
    await flushPromises();
    expect(wrapper.get(".active").exists()).toBe(true);
  });

  it("renders a child component via routing", async () => {
    const wrapper = mount(OnePokemon, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    expect(wrapper.findComponent(RouterLinkStub).props().to.name).toBe(
      "DetailPage"
    );
  });
});
