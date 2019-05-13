import React from "react";
import { mount } from "enzyme";
import App from "../../src/App";

describe("App", () => {
  it("renders header", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(".App").text()).toContain("Finding Falcone");
  });
});
