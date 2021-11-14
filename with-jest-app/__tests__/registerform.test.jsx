/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterForm from "../Auth/RegisterForm";

describe("RegisterForm", () => {
  it("Renders without crashing", () => {
    render(<RegisterForm />);
  });
});
