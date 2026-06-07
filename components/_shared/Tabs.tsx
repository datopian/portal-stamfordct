import React from "react";
import { Tab } from "@headlessui/react";

interface TabProps {
  items: Array<{ title: string; content: React.ReactNode; id: string }>;
}

export default function Tabs({ items }: TabProps) {
  return (
    <Tab.Group>
      <Tab.List className="flex flex-wrap gap-2 border-b border-[var(--surface-border)] pb-4">
        {items.map((item) => (
          <Tab
            key={item.id}
            className={({ selected }) =>
              [
                "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2",
                selected
                  ? "bg-[var(--dark)] text-white shadow-[0_18px_40px_-30px_rgba(16,32,68,0.8)]"
                  : "border border-[var(--surface-border)] text-[var(--gray-dark)] hover:border-[var(--brand-green)] hover:text-[var(--dark)]",
              ].join(" ")
            }
          >
            {item.title}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="pt-2">
        {items.map((item) => (
          <Tab.Panel key={item.id} className="focus:outline-none">
            {item.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
