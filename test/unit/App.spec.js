import React from "react";
import { mount } from "enzyme";
import App from "../../src/App";

describe("App", () => {
  it("renders text homepage", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(".App").text()).toContain("Find Falcone");
  });
});
