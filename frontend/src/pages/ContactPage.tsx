import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-[oklch(0.95_0.01_82)]">
        <section className="mx-auto max-w-[1700px] px-4 pb-12 pt-16 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_1fr] lg:items-stretch">
            <div className="grid gap-14 bg-[oklch(0.95_0.01_82)] p-4 sm:p-8 lg:gap-16 lg:p-10">
              <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:gap-10">
                <p className="text-xs uppercase tracking-[0.24em] text-[oklch(0.34_0.01_72)]">Visit Us</p>
                <p className="text-2xl leading-tight text-[oklch(0.2_0.01_72)] md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
                  Orlando, Florida
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:gap-10">
                <p className="text-xs uppercase tracking-[0.24em] text-[oklch(0.34_0.01_72)]">Get In Touch</p>
                <div className="space-y-7 text-[oklch(0.2_0.01_72)]">
                  <div>
                    <p className="text-xl leading-none" style={{ fontFamily: "var(--font-display)" }}>General Enquiries</p>
                    <a className="mt-2 inline-block text-xl underline decoration-[1.5px] underline-offset-4 transition hover:text-[oklch(0.38_0.08_64)]" href="mailto:margaritalinares@hotmail.com">
                      margaritalinares@hotmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xl leading-none" style={{ fontFamily: "var(--font-display)" }}>Order Enquiries</p>
                    <a className="mt-2 inline-block text-xl underline decoration-[1.5px] underline-offset-4 transition hover:text-[oklch(0.38_0.08_64)]" href="mailto:margaritalinares@hotmail.com?subject=Order%20Enquiry">
                      margaritalinares@hotmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:gap-10">
                <p className="text-xs uppercase tracking-[0.24em] text-[oklch(0.34_0.01_72)]">Business Info</p>
                <div className="space-y-8 text-[oklch(0.2_0.01_72)]">
                  <div>
                    <p className="text-xl leading-none" style={{ fontFamily: "var(--font-display)" }}>Brand Name</p>
                    <p className="mt-2 text-xl">Aromamor Candles</p>
                  </div>
                  <div>
                    <p className="text-xl leading-none" style={{ fontFamily: "var(--font-display)" }}>Studio</p>
                    <p className="mt-2 text-xl">Hand-poured in Orlando, Florida</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] bg-[oklch(0.92_0.01_82)]">
              <img
                src={`${import.meta.env.BASE_URL}visit_us.png`}
                alt="Editorial portrait"
                className="h-full min-h-[620px] w-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
