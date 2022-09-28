import FavoritesPage from "@/views/FavoritesPage.vue";
import { mount } from "@vue/test-utils";

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
      [key: string]: string; // key ve value ya type vermem gerekiyordu and i used an interface [key:string] and value :string. if value was a number type [key:string]:number, that would be.
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
    const wrapper = mount(FavoritesPage);
    expect(wrapper.exists()).toBe(true);
  });
  it("data is added into local storage", () => {
    const mockId = "1";
    const mockJson = { data: "json data" };
    setLocalStorage(mockId, mockJson);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });
});
