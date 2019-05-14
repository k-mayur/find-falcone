import React from "react";
import { mount } from "enzyme";
import Footer from "../../src/components/Footer/Footer";
import Header from "../../src/components/Header/Header";

describe("App", () => {
  // it("renders header", () => {
  //   const wrapper = mount(<Header />);
  //   expect(wrapper.find(".header").text()).toContain("Finding Falcone");
  // });
  it("renders footer", () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.find(".footer").text()).toContain("Coding problem");
  });
});
