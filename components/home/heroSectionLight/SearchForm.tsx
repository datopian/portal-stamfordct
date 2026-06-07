import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@/components/theme/theme-provider";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const SearchForm: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();
  const { styles } = theme;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    router.push({
      pathname: "/search",
      query: { q: searchQuery },
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <input
        id="search-form-input"
        type="search"
        name="search"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder="Search datasets..."
        aria-label="Search datasets"
        className={`min-h-[56px] w-full rounded-full border border-[var(--surface-border)] bg-white px-5 py-4 leading-none text-[var(--dark)] placeholder:text-[var(--gray)] focus:border-[var(--brand-green)] focus:outline-none focus:ring-2 focus:ring-[rgba(121,193,67,0.16)] ${styles.shadowMd}`}
      />
      <button
        type="submit"
        className="inline-flex min-h-[56px] items-center justify-center rounded-full px-2 py-3 text-[12px] font-extrabold uppercase tracking-[0.28em] text-white transition hover:text-[var(--brand-green)] sm:px-4"
      >
        <MagnifyingGlassIcon width={24} className="sm:hidden" />
        <span className="hidden sm:block">Search</span>
      </button>
    </form>
  );
};

export default SearchForm;
