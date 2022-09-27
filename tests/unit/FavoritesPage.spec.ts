import FavoritesPage from "@/views/FavoritesPage.vue";
import { mount } from "@vue/test-utils";

describe("FavoritesPage", () => {
  it("it render the favoritespage component", () => {
    const wrapper = mount(FavoritesPage);
    expect(wrapper.find(".cover").exists()).toBeTruthy();
  });
});
