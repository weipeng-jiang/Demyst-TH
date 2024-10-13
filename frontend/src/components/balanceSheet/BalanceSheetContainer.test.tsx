import { render, screen } from "@testing-library/react";
import { BalanceSheetContainer } from "./BalanceSheetContainer";

describe("BalanceSheetContainer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", () => {
    global.fetch = jest.fn(() => new Promise(() => {}));
    render(<BalanceSheetContainer />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error message if fetch fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Failed to fetch balance sheet."))
    );

    render(<BalanceSheetContainer />);

    await screen.findByText("Failed to fetch balance sheet.");
  });
});
