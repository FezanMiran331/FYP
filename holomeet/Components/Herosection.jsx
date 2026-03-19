"use client";
import React from "react";
import { useRouter } from "next/navigation";
const Herosection = () => {

  const route = useRouter();
  const goToLogin = () => {
    route.push("/login");
  };
  const goToRegister = () => {
    route.push("/register");
  };
  return (
    <section className=" dark:bg-gray-900 ">
      <div className="py-8 px-4 mx-auto max-w-7xl text-center lg:py-16 lg:px-12">


        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">
          We Invest in the World’s Potential
        </h1>
        <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          At HoloMeet, we’re redefining how people connect — blending cutting-edge technology, immersive communication, and seamless collaboration to create meetings that feel truly human
        </p>
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-10 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            <button onClick={goToLogin}
                            className="w-full sm:w-auto sm:min-w-[220px] md:min-w-[250px] lg:min-w-[250px]
                 bg-blue-700  text-white font-bold rounded transition-all duration-300 hover:bg-[#d4461f] hover:scale-105 
                 text-base sm:text-lg md:text-xl lg:text-xl 
                 py-3 sm:py-4 md:py-5 "
                        >
                            Login
                        </button>
            <button onClick={goToRegister}
              className="w-full sm:w-auto text-white sm:min-w-[220px] md:min-w-[250px] lg:min-w-[250px]
                 font-bold border-2 border-black rounded transition-all duration-300 hover:bg-black  hover:scale-105
                 text-base sm:text-lg md:text-xl lg:text-xl
                 py-2 sm:py-4 md:py-5"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
