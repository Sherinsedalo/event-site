import Navbar from "./components/Navbar";
import { MediaCarousel } from "./components/MediaCarousel";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <section className="max-w-screen mx-auto  py-6 bg-[#F8F2E9]">
        <main className="pt-24 px-6 flex gap-8 md:gap-16 leading-8  sm:px-10 md:px-16 font-sans m-30 ">
          <img
            src="src/assets/selfie.jpg"
            className="w-40 h-40 rounded-4xl shadow-lg sm:w-48 sm:h-48  md:h-60 md:w-60 mx-auto sm:mx-0"
          ></img>
          <div className="text-[#6D4C41] flex flex-col gap-4">
            <p className="text-lg md:text-xl">
              Being originally from the Ivory Coast and born in France, when I
              arrived I was always on the lookout for West African restaurants.
              It turns out that it’s quite difficult to find one in Stockholm.
              As I’m passionate about cooking and organizing events, I decided
              to combine my interests and help you discover these popular
              dishes.
            </p>
            <p className="text-lg sm:text-lg md:text-xl">
              So decided to start by organizing event once a month and host a
              few people to share a taste of my country.
            </p>

            <p className="font-semibold text-base sm:text-lg md:text-xl">
              Location: <span className="text-[#D8A7B1]">📍Stockholm</span>
            </p>
          </div>
        </main>
        <div className="py-10">
          <MediaCarousel />
        </div>
      </section>

      <footer className="text-center p-6 text-[#B47B84] font-sans shadow-md bg-[#F8F2E9]">
        2025 Lydia's kök made with ♥️
      </footer>
    </>
  );
}

export default App;
