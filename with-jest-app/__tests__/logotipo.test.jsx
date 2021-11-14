/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Logotipo from "@/components/Logotipo";

describe("Logotipo", () => {
  it("Renders without crashing", () => {
    render(<Logotipo />);
  });
});
