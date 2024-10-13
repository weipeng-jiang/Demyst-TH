import { render, screen } from "@testing-library/react";
import { BalanceSheet } from "./BalanceSheet"; // Adjust import based on your file structure
import { BalanceSheetData } from "./types";

describe("BalanceSheet Component", () => {
  const mockData: BalanceSheetData = {
    Reports: [
      {
        ReportID: "1",
        ReportName: "Balance Sheet Report",
        ReportType: "Financial",
        ReportTitles: ["Balance Sheet", "Q3 2024"],
        ReportDate: "2024-09-30",
        UpdatedDateUTC: "2024-09-30",
        Rows: [
          {
            RowType: "Header",
            Cells: [
              { Value: "Assets" },
              { Value: "Liabilities" },
              { Value: "Equity" },
            ],
          },
          {
            RowType: "DataRow",
            Title: "Current Assets",
            Cells: [],
            Rows: [
              {
                RowType: "DataRow",
                Title: "Non-cash",
                Cells: [{ Value: "600" }, { Value: "100" }, { Value: "300" }],
              },
              {
                RowType: "DataRow",
                Title: "Cash",
                Cells: [{ Value: "1000" }, { Value: "200" }, { Value: "500" }],
              },
            ],
          },
          {
            RowType: "Section",
            Title: "Total Assets",
            Cells: [
              {
                Value: "Total Assets",
              },
              {
                Value: "2357234.34",
              },
              {
                Value: "1925983.63",
              },
            ],
          },
        ],
      },
    ],
  };

  test("renders the report name and titles", () => {
    render(<BalanceSheet data={mockData} />);

    expect(
      screen.getByText("Report Name: Balance Sheet Report")
    ).toBeInTheDocument();
    expect(screen.getByText("Balance Sheet - Q3 2024")).toBeInTheDocument();
  });

  test("renders table headers from the first row of cells", () => {
    render(<BalanceSheet data={mockData} />);

    expect(screen.getByText("Assets")).toBeInTheDocument();
    expect(screen.getByText("Liabilities")).toBeInTheDocument();
    expect(screen.getByText("Equity")).toBeInTheDocument();
  });

  test("renders row titles and cell values correctly", () => {
    render(<BalanceSheet data={mockData} />);

    expect(screen.getByText("Current Assets")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  test("applies bold styling to SummaryRow", () => {
    render(<BalanceSheet data={mockData} />);

    const totalRowCell = screen.getByText("Total Assets");
    expect(totalRowCell).toHaveStyle("font-weight: bold");
  });
});
