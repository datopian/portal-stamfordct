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
        className={`min-h-[58px] w-full rounded-full border border-[var(--surface-border)] bg-white px-5 py-4 leading-none text-[var(--dark)] placeholder:text-[var(--gray)] focus:border-[var(--brand-green)] focus:outline-none ${styles.shadowMd}`}
      />
      <button
        type="submit"
        className={`inline-flex min-h-[58px] items-center justify-center rounded-full px-6 py-3 text-[13px] font-bold uppercase tracking-[0.22em] md:px-8 ${styles.bgDark} ${styles.textLight}`}
      >
        <MagnifyingGlassIcon width={24} className="sm:hidden" />
        <span className="hidden sm:block">Search</span>
      </button>
    </form>
  );
};

export default SearchForm;
