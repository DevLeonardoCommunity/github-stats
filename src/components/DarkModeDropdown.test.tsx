import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { DarkModeDropdown } from "./DarkModeDropdown";

describe("DarkModeDropdown", () => {
  test("should change Dark Icon if click light mode", () => {
    render(<DarkModeDropdown />);

    const button = screen.getByTestId("light-mode");
    fireEvent.click(button);

    const darkModeItem = screen.getByText("Dark Mode");
    fireEvent.click(darkModeItem);

    const darkModeButton = screen.getByTestId("dark-mode");

    expect(darkModeButton).not.toBeNull();
  });
});
