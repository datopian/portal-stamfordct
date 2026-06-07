import { useState } from "react";
import { useSearchState } from "./SearchContext";

export default function DatasetSearchForm() {
  const { setOptions, options } = useSearchState();
  const [q, setQ] = useState(options.query ?? "");
  const handleSubmit = (e) => {
    e.preventDefault();
    setOptions({
      query: q,
    });
    return false;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex min-h-[76px] flex-col gap-3 ]  lg:flex-row lg:items-center">
        <input
          type="text"
          placeholder="Type in keyword..."
          className="grow rounded-full border border-[var(--surface-border)] bg-white px-5 py-4 text-[var(--dark)] placeholder:text-[var(--gray)] outline-0 focus:border-[var(--brand-green)]"
          name="query"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search datasets"
        />

        <button
          className="inline-flex items-center justify-center rounded-full bg-[var(--brand-aqua)] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.22em] text-[var(--interactive-hover-text)] transition hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
          type="submit"
        >
          SEARCH
        </button>
      </div>
    </form>
  );
}
