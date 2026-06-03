import PortalDefaultLogo from "@/components/_shared/PortalDefaultLogo";
import { useTheme } from "@/components/theme/theme-provider";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LighterThemeHeader() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const portalLogo = process?.env?.NEXT_PUBLIC_PORTAL_LOGO;
  const navigation = [
    { href: "/search", label: "Search" },
    { href: "/organizations", label: "Organizations" },
    { href: "/groups", label: "Groups" },
  ];

  const renderLogo = () => {
    if (portalLogo) {
      return (
        <Link href="/" className="inline-flex items-center">
          <Image
            src={portalLogo}
            alt="Stamford Open Data"
            height={60}
            width={60}
          />
        </Link>
      );
    }

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
    <header className=" bg-white/95 backdrop-blur">
      <nav
        className={`mx-auto flex custom-container items-center justify-between gap-6 py-4 ${theme.styles.containerWide}`}
        aria-label="Global"
      >
        <div className="flex items-center gap-6 xl:gap-12 w-full justify-between">
          <span className="sr-only">Stamford Open Data</span>
          {renderLogo()}

          <div className="hidden lg:flex mt-2 mx-auto lg:items-center lg:gap-x-8 font-josefin ">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b-2 text-[18px] font-bold uppercase tracking-[0.5px] transition ${
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
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto border-l border-[var(--surface-border)] bg-white px-5 py-5 shadow-[0_28px_70px_-42px_rgba(17,32,57,0.58)] sm:max-w-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="sr-only">Stamford Open Data</span>
            <div className="md:hidden">{renderLogo()}</div>
            <button
              type="button"
              className="-m-2.5 rounded-full p-2.5 text-[var(--text-base)] transition hover:bg-[var(--surface-muted)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-[var(--surface-border)]">
              <div className="space-y-2 py-6 flex flex-col">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-[var(--surface-border)] px-4 py-3 text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--dark)] transition hover:border-[var(--brand-green)] hover:bg-[var(--surface-muted)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
