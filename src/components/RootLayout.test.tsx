import { render, screen } from "@testing-library/react";
import { RootLayout } from "./RootLayout";
import { vi, describe, test, expect } from "vitest";

vi.mock("./Header", () => ({
  Header: () => <div>Header</div>,
}));

vi.mock("next/font/google", () => ({
  Inter: () => <div>GoogleFont</div>,
}));

describe("RootLayout", () => {
  test("renders the children", () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    expect(screen.getByText("Test Content")).toBeDefined();
  });
});
