import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { width } = useViewportSize();
  const isMobile = width < 768;

  const handleNav = () => setNavOpen(!navOpen);

  const navItems = ["about", "book", "contact"];

  return (
    <nav className="bg-[#FAF3EE] shadow-md fixed w-full z-40 font-sans ">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center h-auto justify-between py-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <img
            src="src/assets/event-logo.jpg"
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 md:h-14 md:w-14 flex-shrink-0 shadow-md border border-[#EADDD4]"
            alt="Lydia event logo"
          ></img>

          <NavLink
            to="/event"
            className="text-[#D8A7B1] text-xl sm:text-2xl md:text-3xl font-bold tracking-wide transition-all hover:text-[#B47B84]"
          >
            Lydia's Kök
          </NavLink>
        </div>
        {/* Desktop Navigation */}

        <ul className={" hidden md:flex gap-10 text-[#D8A7B1] ml-auto"}>
          {navItems.map((item) => (
            <li key={item}>
              <NavLink
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `hover:text-[#B47B84] transition ${
                    isActive ? "font-bold text-[#B47B84] underline" : ""
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* mobile navigation button */}

        <button
          aria-labelledby="Menu Toggle Button"
          className="md:hidden transition ml-auto text-[#D8A7B1] hover:text-[#B47B84]"
          onClick={handleNav}
        >
          {navOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {/* mobile navigation */}
      <div
        className={`md:hidden transition-all duration-300 ${
          navOpen ? "block" : "hidden"
        }`}
      >
        {navOpen && (
          <ul className="flex flex-col items-center gap-6 bg-[#FAF3EE] shadow-lg text-center p-4 text-[#D8A7B1] w-full">
            {navItems.map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `hover:text-[#B47B84 transition ${
                      isActive ? "font-bold text-[#B47B84 underline" : ""
                    }`
                  }
                  onClick={() => setNavOpen(false)}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
