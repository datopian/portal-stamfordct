import { useResourceData } from "./DataProvider";

export default function TableActions() {
  const { dataUrl, data } = useResourceData();
  const handleDownload = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex  gap-1">
      <div className="flex gap-1">
        <div className="relative inline-block">
          <a
            onClick={handleDownload}
            className="inline-flex w-full cursor-pointer justify-center gap-x-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(25,37,76,0.14)] ring-1 ring-inset ring-[var(--accent)] transition-all hover:bg-[var(--accent-dark)]"
          >
            Export
          </a>
        </div>
      </div>
    </div>
  );
}
