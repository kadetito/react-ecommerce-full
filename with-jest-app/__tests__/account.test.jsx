/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Account from "pages/Account";

describe("Account", () => {
  it("Renders without crashing", () => {
    render(<Account />);
  });
});
