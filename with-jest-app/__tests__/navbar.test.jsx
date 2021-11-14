/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "@/components/NavBar";

describe("NavBar", () => {
  it("Renders without crashing", () => {
    render(<NavBar />);
  });
});
