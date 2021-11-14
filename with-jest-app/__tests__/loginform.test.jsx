/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import LoginForm from "../Auth/LoginForm";

describe("LoginForm", () => {
  it("Renders without crashing", () => {
    render(<LoginForm />);
  });
});
