import DetailPage from "@/views/DetailPage.vue";
import { mount } from "@vue/test-utils";

describe("DetailPage", () => {
  test("it renders the component", () => {
    const wrapper = mount(DetailPage);
    expect(wrapper.find(".cover").exists()).toBe(true);
  });
  it("it renders the component", () => {
    const wrapper = mount(DetailPage);
    expect(wrapper.find("h3").exists()).toBe(true);
  });
  it("total p number", () => {
    const wrapper = mount(DetailPage);
    expect(wrapper.findAll("p").length).toBe(3);
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
