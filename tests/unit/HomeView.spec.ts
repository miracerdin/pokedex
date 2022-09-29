import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import HomeView from "@/views/HomeView.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
describe("Actions.vue", () => {
  let actions: any;
  let store: any;
  let getters;
  // gettersMock.mockReturnValue("Miraç mockladı")
  beforeEach(() => {
    (actions = {
      fetchPokemon: jest.fn(),
      actionInput: jest.fn(),
    }),
      (getters = {
        allDataList: () => [],
      });
    store = new Vuex.Store({
      actions,
      getters,
    });
  });

  test("is renders HomeView component", () => {
    const wrapper = shallowMount(HomeView, { store, localVue });
    expect(wrapper.find("div").exists()).toBe(true);
  });

  it("action çalışıyor", () => {
    const wrapper = shallowMount(HomeView, { store, localVue });
    const input = wrapper.find("input");
    input.element.ariaValueText = "not search";
    input.trigger("input");
    expect(actions.actionInput).not.toHaveBeenCalled();
  });
});
