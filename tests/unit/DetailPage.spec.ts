import DetailPage from "@/views/DetailPage.vue";
import { mount } from "@vue/test-utils";

describe("DetailPage", () => {
  test("it renders the component", () => {
    const wrapper = mount(DetailPage);
    expect(wrapper.find(".cover").exists()).toBe(true);
  });
  it("should mount on a page", () => {
    const wrapper = mount(DetailPage, {
      mocks: {
        $route: {
          params: {
            name: "dataEach",
          },
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
