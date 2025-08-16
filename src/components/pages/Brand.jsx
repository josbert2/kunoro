
import { useRef } from "react";

export default function Brand() {
    const contentRef = useRef(null);
    return (
        <>
            {/* Brands Section */}
          <section className="py-20 px-8 bg-white"  ref={contentRef}>
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-12">
                WE WORKED WITH GLOBAL LARGEST BRANDS
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
                {/* Creative Logo */}
                <div className="flex items-center justify-center h-16">
                  <div className="text-2xl font-bold text-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border-2 border-gray-800"></div>
                      <span>CREATIVE</span>
                    </div>
                  </div>
                </div>

                {/* Triangle Logo */}
                <div className="flex items-center justify-center h-16">
                  <div className="text-xl font-bold text-gray-800">
                    <div className="flex flex-col items-center">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-800 mb-1"></div>
                      <span className="text-sm">CREATIVE</span>
                    </div>
                  </div>
                </div>

                {/* Innovate Logo */}
                <div className="flex items-center justify-center h-16">
                  <div className="text-lg font-bold text-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                      </div>
                      <span>Innovate</span>
                    </div>
                  </div>
                </div>

                {/* Express Logo */}
                <div className="flex items-center justify-center h-16">
                  <div className="text-xl font-bold text-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="text-3xl">✕</div>
                      <span>Express</span>
                    </div>
                  </div>
                </div>

                {/* Brand Name Logo */}
                <div className="flex items-center justify-center h-16">
                  <div className="text-xl font-bold text-gray-800">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold">7A</div>
                      <span className="text-xs">BRANDNAME</span>
                    </div>
                  </div>
                </div>

                {/* Name Logo */}
                <div className="flex items-center justify-center h-16">
                  <div className="text-xl font-bold text-gray-800 italic">
                    <span className="font-serif">Name</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>

    );
}