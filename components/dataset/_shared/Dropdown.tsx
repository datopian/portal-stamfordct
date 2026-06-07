import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface DropdownProps {
  options: string[];
  defaultOption: string;
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultOption,
  onSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-3 rounded-lg bg-white md:pl-4">
        <h2 className="text-[14px] font-normal leading-normal text-[var(--gray-dark)]">
          Sort by:
        </h2>
        <div
          className="flex h-[40px] min-w-[100px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--surface-border)] bg-white px-4 shadow-[0_16px_34px_-28px_rgba(25,37,76,0.2)]"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <h2 className="select-none text-[14px] font-normal leading-normal text-[var(--dark)]">
            {defaultOption}
          </h2>
          <RiArrowDropDownLine size={25} className="text-[var(--accent)]" />
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute left-0 top-full z-10 mt-2 w-full select-none rounded-xl border border-[var(--surface-border)] bg-white shadow-[0_24px_48px_-30px_rgba(25,37,76,0.24)]">
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 text-[var(--dark)] transition hover:bg-[var(--surface-muted)]"
              onClick={() => {
                onSelect(option);
                setIsDropdownOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
