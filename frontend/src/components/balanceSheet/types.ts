export type Cell = {
  Value: string;
  Attributes?: { Value: string; Id: string }[];
};

export type Row = {
  RowType: string;
  Cells: Cell[];
  Title?: string;
  Rows?: Row[];
};

export type BalanceSheetData = {
  Reports: {
    ReportID: string;
    ReportName: string;
    ReportType: string;
    ReportTitles: string[];
    ReportDate: string;
    UpdatedDateUTC: string;
    Rows: Row[];
  }[];
};
