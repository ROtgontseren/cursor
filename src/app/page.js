import HomePage from "@/components/home/index";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <main className="bg-inherit" id="container">
        <Script id="scroll-layer">
          {`
            let layer = document.querySelector('.layer');
            window.addEventListener('scroll', function () {
              let value = window.scrollY;
              layer.style.left = value * 2 + 'px';
            });
          `}
        </Script>
        <HomePage />
      </main>
    </>
  );
}
