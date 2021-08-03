import "regenerator-runtime/runtime";
import React from "react";
import Home from "../containers/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

test("Should display the contents of the home component", () => {
  const { container } = render(
    <Router>
      <Home />
    </Router>
  );
  const homeDiv = container.querySelector(".home-page");
  expect(homeDiv).toBeDefined();
});

module.exports = {};
