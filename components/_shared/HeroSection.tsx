export default function HeroSection({
  title = "Search",
  titleAccent = "",
  cols = "1",
}) {
  const columnClass =
    cols === "2"
      ? "md:grid-cols-2"
      : cols === "3"
        ? "md:grid-cols-3"
        : "md:grid-cols-1";

  return (
    <section className="row-start-1 row-span-3 col-span-full border-b border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(37,59,99,0.06)_0%,_rgba(125,182,64,0.08)_100%)]">
      <div className="flex flex-col bg-cover bg-center bg-no-repeat pb-[48px] pt-[48px] md:pb-[64px]">
        <div
          className={`custom-container mx-auto grid ${columnClass} grow items-center gap-6 rounded-[28px] bg-white px-8 py-10 shadow-[0_24px_56px_-40px_rgba(17,32,57,0.42)]`}
        >
          <div className="col-span-1">
            <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--gray-dark)]">
              <span className="h-px w-10 bg-[var(--brand-green)]" />
              Open Data
            </span>
            <h1 className="text-[30px] font-black leading-[1.05] text-[var(--dark)] md:text-[50px] lg:max-w-[80%]">
              {title} <span className="text-accent">{titleAccent}</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
