import { createLocalVue, mount, RouterLinkStub } from "@vue/test-utils";
import App from "../../src/App.vue";
import VueRouter from "vue-router";
import Vue from "vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

Vue.use(VueRouter);

describe("App.vue", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = mount(App, { router });
  });

  it("should mount page", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("should mount root div", () => {
    expect(wrapper.get("#app").exists()).toBe(true);
  });
  it("should mount home all routes", () => {
    expect(wrapper.text()).toContain("Home");
    expect(wrapper.text()).toContain("FavoritesPage");
  });
});
