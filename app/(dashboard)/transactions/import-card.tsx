import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ImportTable } from "./import-table";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = [
  "amount",
  "date",
  "payee",
];

interface SelectedColumnsState {
  [key: string]: string | null;
};

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: string[]) => void;
}

export const ImportCard = ({
  data,
  onCancel,
  onSubmit
}: Props) => {
  const [selectedColumns, setselectedColumns] = useState<SelectedColumnsState>({});
  
  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setselectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mapped = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body.map((row) => {
        const transformedRow = row.map((cell, index) => {
          const columnIndex = getColumnIndex(`column_${index}`);
          return selectedColumns[`column_${columnIndex}`] ? cell : null;
        });
        return transformedRow.every((item) => item !== null)
          ? []
          : transformedRow;
      }).filter((row) => row.length > 0),
    };
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="!flex flex-col lg:flex-row items-center justify-between gap-y-2 px-6">
          <CardTitle className="text-xl line-clamp-1">
            Import Transaction
          </CardTitle>
          <div className="!flex flex-col lg:flex-row w-full lg:w-auto gap-y-2 gap-x-2 items-stretch lg:items-center">
            <Button
              onClick={onCancel}
              size="sm"
              className="w-full lg:w-auto"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={progress < requiredOptions.length}
              onClick={handleContinue}
              className="w-full lg:w-auto"
            >
              Continue ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  )
}