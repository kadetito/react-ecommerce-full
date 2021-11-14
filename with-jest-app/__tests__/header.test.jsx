/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
  it("Renders without crashing", () => {
    render(<Header />);
  });
});
