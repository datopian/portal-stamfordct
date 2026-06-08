import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Dataset } from "@/schemas/dataset.interface";
import { useEffect, useRef, useState } from "react";
import MarkdownRenderer from "@/components/_shared/MarkdownRenderer";

export default function DatasetDescription({
  dataset,
  content,
  showLabel = true,
  className = "",
}: {
  dataset?: Dataset;
  content?: string;
  showLabel?: boolean;
  className?: string;
}) {
  const [isTruncated, setIsTruncated] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const descriptionSource = content ?? dataset?.notes ?? "";
  const description =
    descriptionSource.replace(/<\/?[^>]+(>|$)/g, "") || "No description";

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      requestAnimationFrame(() => {
        setIsTruncated(el.scrollHeight > el.clientHeight);
      });
    }
  }, [descriptionSource, showFullDescription]);

  return (
    <div
      className={`rounded-[22px] border border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(244,248,249,0.72)_100%)] px-4 py-5 md:px-5 ${className}`.trim()}
    >
      {showLabel ? (
        <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--gray-dark)]">
          Description
        </h2>
      ) : null}
      <div
        ref={textRef}
        className={`text-sm leading-7 text-[var(--gray-dark)] transition-all ${
          !showFullDescription ? "line-clamp-4" : ""
        }`}
      >
        <MarkdownRenderer content={description} />
      </div>
      {isTruncated && (
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="mt-3 inline-flex items-center border-b border-[var(--accent)] text-sm font-semibold text-[var(--gray-dark)] transition hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
        >
          {showFullDescription ? (
            <span className="flex items-center">
              Read less <ChevronUpIcon className="w-4 text-[var(--accent)]" />
            </span>
          ) : (
            <span className="flex items-center">
              Read more <ChevronDownIcon className="w-4 text-[var(--accent)]" />
            </span>
          )}
        </button>
      )}
    </div>
  );
}
