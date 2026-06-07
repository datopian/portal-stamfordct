import Slider from "rc-slider";
import { useState } from "react";
import { RiPushpin2Line } from "react-icons/ri";

import DateRange from "./DateRange";
import { sortConfigProps, useResourceData } from "./DataProvider";
import { isValidDate } from "./utils";

export default function TableHeadCell({ col: key }) {
  const {
    data,
    filteredData,
    sortConfig,
    visibleColumns,
    pinnedColumns,
    setSortConfig,
    updateFilter,
  } = useResourceData();

  const min = Math.min(...data.map((row) => row[key]));
  const max = Math.max(...data.map((row) => row[key]));

  const [value, setValue] = useState<number[]>([min, max]);

  return (
    <th
      className={`group min-w-[140px] whitespace-nowrap border-0 bg-[var(--accent-light)] py-2 text-left ${
        !visibleColumns.includes(key) ? "hidden" : ""
      } ${
        pinnedColumns.includes(key)
          ? "sticky left-0 z-10 bg-[var(--accent-light)]"
          : ""
      }`}
      role="columnheader"
      scope="col"
    >
      <div className="flex justify-between gap-2 px-3 pb-2 text-left">
        <div className="flex truncate">
          <button
            onClick={() =>
              setSortConfig((prev: sortConfigProps) =>
                prev?.key === key && prev.direction === "asc"
                  ? { key, direction: "desc" }
                  : { key, direction: "asc" }
              )
            }
            title={key}
            className="truncate text-left text-sm font-normal text-[var(--gray-dark)]"
          >
            <span className="font-[600]">{key}</span>{" "}
            {sortConfig?.key === key
              ? sortConfig.direction === "asc"
                ? "↑"
                : "↓"
              : ""}
          </button>
        </div>
        <PinButton col={key} />
      </div>

      <div className="border-t border-[var(--surface-border)] px-3 pt-2">
        {typeof data[0]?.[key] === "number" ? (
          <div className="group flex h-[34px] w-full items-center">
            <div className="w-full">
              <div className="relative mx-2">
                <Slider
                  range
                  value={value}
                  min={Math.min(...data.map((row) => row[key]))}
                  max={Math.max(...data.map((row) => row[key]))}
                  onChange={(v: number[]) => {
                    setValue(v);
                    updateFilter(key, v);
                  }}
                  aria-label={`Range filter for ${key}`}
                />
              </div>
            </div>
          </div>
        ) : isValidDate(data[0]?.[key]) ? (
          <DateRange
            onSelect={(v: any) => {
              if (v[0] && v[1]) {
                updateFilter(key, v);
              } else {
                updateFilter(key, []);
              }
            }}
          />
        ) : (
          <input
            type="text"
            placeholder={`Filter ${filteredData?.length} records `}
            className="w-full h-[40px] rounded-lg border border-[var(--surface-border)] bg-white p-[5px] font-normal text-[var(--dark)] shadow-[0_10px_24px_rgba(25,37,76,0.05)] outline-none transition placeholder:text-[14px] placeholder:font-normal placeholder:text-[var(--gray)] focus:border-[var(--accent)]"
            onChange={(e) => updateFilter(key, e.target.value)}
            aria-label={`Filter  ${key}`}
          />
        )}
      </div>

      {pinnedColumns.includes(key) && (
        <span className="absolute right-[0px] top-0 h-full w-[1px] bg-[var(--surface-border)]"></span>
      )}
    </th>
  );
}

export const PinButton = ({ col }: { col: string }) => {
  const { pinnedColumns, togglePinColumn } = useResourceData();
  return (
    <button
      onClick={() => togglePinColumn(col)}
      className={`relative w-fit rounded-lg border border-[var(--surface-border)] bg-white p-1 text-left text-[var(--accent)] shadow-[0_10px_24px_rgba(25,37,76,0.05)] transition-all group-hover:opacity-[1] ${
        !pinnedColumns.includes(col) ? "opacity-0" : ""
      }`}
      title={"Pin this column"}
      aria-label={`Pin the column ${col}`}
    >
      <RiPushpin2Line width={16} />
    </button>
  );
};
