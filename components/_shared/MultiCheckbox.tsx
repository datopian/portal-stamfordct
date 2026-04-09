import { CheckIcon } from "@heroicons/react/20/solid";
import { useSearchState } from "../dataset/search/SearchContext";
import { useRef } from "react";

type MultiCheckboxProps = {
  name: string;
  value: string;
  label: string;
  count?: number;
};

export const MultiCheckbox = ({
  name,
  value,
  label,
  count,
}: MultiCheckboxProps) => {
  const inputRef = useRef();
  const { setOptions, options: searchOptions } = useSearchState();

  const searchOptionsField = searchOptions[name] as Array<string>;
  const active = searchOptionsField?.includes(value);

  const select = () => {
    const searchOptionsValue = [...searchOptionsField];
    const indexOfNewValue = searchOptionsValue.findIndex((v) => v == value);

    if (indexOfNewValue >= 0) {
      searchOptionsValue.splice(indexOfNewValue, 1);
    } else {
      searchOptionsValue.push(value);
    }

    setOptions({ [name]: searchOptionsValue, offset: 0 });
  };

  return (
    <div className="flex items-center mb-[10px]">
      <input
        type="checkbox"
        id={`${name}-${value}`}
        checked={active}
        onChange={select}
        className="hidden"
        ref={inputRef}
      />
      <label
        htmlFor={`${name}-${value}`}
        tabIndex={0}
        className={`flex h-5 w-5 min-w-[1.25rem] items-center justify-center rounded border-2 transition-colors cursor-pointer ${
          active
            ? "border-[var(--brand-green)] bg-[var(--brand-green)] text-white"
            : "border-[var(--surface-border)] bg-[var(--surface-muted)] text-[var(--gray-dark)]"
        }`}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            select();
          }
        }}
      >
        {active && <CheckIcon width={16} />}
        <span className="sr-only">{label}</span>
      </label>
      <span
        onClick={select}
        className="ml-3 flex w-full cursor-pointer gap-1 text-[var(--gray-dark)]"
      >
        {label}
        {count && (
          <span className="ml-auto inline-flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[var(--surface-muted)] px-1.5 py-0.5 text-xs font-medium text-[var(--gray-dark)] ring-1 ring-inset ring-[var(--surface-border)]">
            {count}
          </span>
        )}
      </span>
    </div>
  );
};

export default MultiCheckbox;
