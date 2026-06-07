import PortalDefaultLogo from "@/components/_shared/PortalDefaultLogo";
import { useTheme } from "@/components/theme/theme-provider";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LighterThemeHeader() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const navigation = [
    { href: "/search", label: "Search" },
    { href: "/organizations", label: "Organizations" },
    { href: "/groups", label: "Groups" },
  ];

  const renderLogo = () => {
    return <PortalDefaultLogo />;
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false); // Close the menu
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <header className="border-b border-[var(--surface-border)] bg-white/95 backdrop-blur">
      <nav
        className={`mx-auto flex custom-container items-center justify-between gap-6 py-4 lg:py-5 ${theme.styles.containerWide}`}
        aria-label="Global"
      >
        <div className="flex w-full items-center justify-between gap-6 xl:gap-12">
          <span className="sr-only">Stamford Open Data</span>
          {renderLogo()}

          <div className="ml-auto hidden font-sans lg:flex lg:items-center lg:gap-x-12">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b-2 pb-1 text-[18px] font-bold uppercase tracking-[0.04em] transition ${
                    isActive
                      ? "border-[var(--brand-green)] text-[var(--dark)]"
                      : "border-transparent text-[var(--gray-dark)] hover:border-[var(--brand-green)] hover:text-[var(--accent)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-muted)] p-2.5 text-[var(--dark)]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-40 bg-[rgba(25,37,76,0.24)] backdrop-blur-[4px]" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[360px] flex-col overflow-y-auto border-l border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(237,245,244,0.98)_100%)] px-5 py-5 shadow-[0_30px_80px_-24px_rgba(25,37,76,0.42)]">
          <div className="flex items-start justify-between gap-3 pb-5">
            <span className="sr-only">Stamford Open Data</span>
            <div className="origin-left scale-[0.9] shrink-0">{renderLogo()}</div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--surface-border)] bg-white text-[var(--text-base)] transition hover:border-[var(--brand-green)] hover:bg-[var(--surface-muted)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-1 flex-col rounded-[28px] border border-[var(--surface-border)] bg-white/95 p-4 shadow-[0_20px_48px_-36px_rgba(25,37,76,0.18)]">
            <div className="mb-4 border-b border-[var(--surface-border)] pb-4">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--gray-dark)]">
                Menu
              </p>
            </div>

            <div className="flex flex-col gap-2 font-sans">
              {navigation.map((item) => {
                const isActive = router.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex min-h-[52px] items-center rounded-[18px] px-4 text-[16px] font-semibold tracking-[0.01em] transition ${
                      isActive
                        ? "bg-[var(--dark)] text-white shadow-[0_16px_36px_-28px_rgba(25,37,76,0.35)]"
                        : "text-[var(--dark)] hover:bg-[var(--surface-muted)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-6">
              <p className="text-[13px] leading-6 text-[var(--gray-dark)]">
                Browse public datasets, organizations, and groups across the
                portal.
              </p>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
