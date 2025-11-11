import { TextAnimate } from "../text-blur";
import GradientBackground from "../GradientBackground";

export default function Main() {
    return (
      <>
        <main className="relative">
            <div className="framer-3y1b7i !z-20">
              <div className="flex flex-wrap items-center gap-2 framer-text font-playfair">
                <TextAnimate animation="blurInUp" by="character" once>
                  Let´s create
                </TextAnimate>

                <TextAnimate
                  animation="blurInUp"
                  by="character"
                  colors={['#2563eb', '#dc2626', '#16a34a', '#9333ea']}
                  loopWords={['design', 'development', 'marketing', 'brands', 'products']}
                  rotateInterval={5000}
                  delay={0.5}
                />
              </div>
              <div className="framer-1kfwg09">
                <div className="framer-dnb8d0">
                  <p style={{
                    "--font-selector": "R0Y7Q2F2ZWF0LXJlZ3VsYXI=",
                    "--framer-font-family": "Caveat", 
                    "--framer-font-size": "170px",
                    "--framer-letter-spacing": "-0.07em",
                    "--framer-line-height": "70%",
                    "--framer-text-alignment": "center",
                    "--framer-text-color": "var(--token-a52a650f-fdc2-43f9-93f7-15f9ca573529, rgb(0, 0, 0))"
                  }} class="framer-text">together.</p>
                </div>
                <div class="framer-su7jo2">
                  <p class="framer-text framer-styles-preset-l27xre font-family-kanit" data-styles-preset="pobGLBR7U" 
                    style={{
                      "line-height": "25px",
                      "--framer-font-family": "Geist", 
                      "--framer-font-family-bold": "Geist",
                      "--framer-font-size": "16px",
                      "--framer-text-color": "var(--token-d44e6e98-b203-46a0-934d-afe776b534e5, rgb(136, 136, 136))"
                      
                    }}>
                      We help businesses find their voice, shape their identity, and&nbsp;connect with their audience.
                      <span style={{
                        "font-size": "18px",
                    
                        "font-weight": "600",
                        "--framer-font-family": "Geist",
                        "--framer-font-family-bold": "Geist",
                        "--framer-font-size": "16px",
                        "--framer-text-color": "var(--token-a52a650f-fdc2-43f9-93f7-15f9ca573529, rgb(0, 0, 0))"
                      }} ><strong >Less talk. More craft.</strong></span>
                  </p>
                </div>
              </div>
            </div>
            <div className="min-h-screen w-full relative bg-white z-10">
              <GradientBackground 
                variant="mintGreen" 
                intensity="soft" 
                animation="shift"
              />
            </div>
        </main>
      </>

    );
}   