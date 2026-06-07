import { useTheme } from "../theme/theme-provider";

export default function FacetCard({
  title,
  children,
  showClear,
  clearAction,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  showClear?: boolean;
  clearAction?: Function;
}) {
  const {
    theme: { styles },
  } = useTheme();

  return (
    <section className={`mb-4 rounded-[22px] bg-white p-6 ${styles.shadowMd}`}>
      <div className="flex items-center pb-4">
        {title && (
          <h1 className="m-0 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--gray-dark)]">
            {title}
          </h1>
        )}
      </div>
      <div>{children}</div>
      {showClear && (
        <div>
          <span
            role="button"
            className="mt-4 inline-flex cursor-pointer text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-dark)] hover:underline"
            onClick={() => clearAction && clearAction()}
          >
            Clear
          </span>
        </div>
      )}
    </section>
  );
}
