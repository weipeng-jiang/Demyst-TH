import { Fragment } from "react";
import { BalanceSheetData, Cell, Row } from "./types";

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
        <TableHeader headerCells={report.Rows[0].Cells} />
        <TableBody rows={report.Rows.slice(1)} />
      </table>
    </div>
  );
};

const TableHeader = ({ headerCells }: { headerCells: Cell[] }) => (
  <thead>
    <tr>
      {headerCells.map((cell, index) => (
        <th key={`${cell.Value}-${index}`}>{cell.Value}</th>
      ))}
    </tr>
  </thead>
);

const TableBody = ({ rows }: { rows: Row[] }) => (
  <tbody>
    {rows.map((row, index) => (
      <TableSection section={row} key={`${row.Title || index}`} />
    ))}
  </tbody>
);

const TableSection = ({ section }: { section: Row }) => (
  <Fragment>
    {section.Title && (
      <tr>
        <th style={{ textAlign: "left" }}>{section.Title}</th>
      </tr>
    )}
    {section.Rows?.map((subRow) => (
      <TableRow row={subRow} key={subRow.Title || subRow.Cells[0].Value} />
    ))}
  </Fragment>
);

const TableRow = ({ row }: { row: Row }) => (
  <Fragment>
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
    {row.Rows?.map((subRow) => (
      <TableRow row={subRow} key={subRow.Title || subRow.Cells[0].Value} />
    ))}
  </Fragment>
);
