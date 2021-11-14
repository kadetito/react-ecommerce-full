/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import MenuUsuario from "@/components/MenuUsuario";

describe("MenuUsuario", () => {
  it("Renders without crashing", () => {
    render(<MenuUsuario />);
  });
});
