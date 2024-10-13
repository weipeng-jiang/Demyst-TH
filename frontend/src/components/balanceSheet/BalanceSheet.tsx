import React, { Fragment } from "react";
import { BalanceSheetData, Row } from "./types";

type BalanceSheetProps = {
  data: BalanceSheetData;
};

export const BalanceSheet = ({ data }: BalanceSheetProps) => {
  const report = data.Reports[0];
  return (
    <div>
      <h2>Report Name: {report.ReportName}</h2>
      <h3>{report.ReportTitles.join(" - ")}</h3>
      <table>
        <thead>
          <tr>
            {report.Rows[0].Cells.map((cell, index) => (
              <th key={`${cell.Value}-${index}`}>{cell.Value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {report.Rows.slice(1).map((row, index) => renderSection(row, index))}
        </tbody>
      </table>
    </div>
  );
};

const renderSection = (section: Row, index: number) => (
  <Fragment key={`${section.Title}-${index}`}>
    {section.Title && (
      <tr>
        <th style={{ textAlign: "left" }}>{section.Title}</th>
      </tr>
    )}
    {section.Rows && section.Rows.map((row) => renderRow(row))}
  </Fragment>
);

const renderRow = (row: Row, depth = 0) => {
  return (
    <Fragment key={row.Title || row.Cells[0].Value}>
      <tr>
        {row.Cells.map((cell, index) => (
          <td
            key={`${cell.Value}-${index}`}
            style={{
              textAlign: "left",
              fontWeight: row.RowType === "SummaryRow" ? "bold" : "normal",
              paddingBottom: row.RowType === "SummaryRow" ? 30 : 0,
            }}
          >
            {cell.Value}
          </td>
        ))}
      </tr>
      {row.Rows && row.Rows.map((subRow) => renderRow(subRow, depth + 1))}
    </Fragment>
  );
};
