import ScrollFillTextAdvanced from '../ScrollFillTextAdvanced';
import CustomButton from '../CustomButton';

export default function AboutUs() {
    return (
        <>
            <section>
                <div class="bg-[#131514] z-[100] relative" style={{
                        backgroundImage: "url(https://html.ravextheme.com/redox/light/assets/imgs/digital-agency-modern/hero-3-bg-shape.webp)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                }}>
                    <div>
                    
                    </div>
                    <div className="text-white text-xl font-bold relative text-center pt-20 pb-20 flex items-center justify-center"  >
                    
                        <div className="absolute left-40 top-20">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="54" height="66" fill="#ffffff">
                        <path d="M0 0 C2.3732489 2.3732489 2.31898786 3.25714676 2.75 6.5 C4.06184134 13.58189346 7.44620438 19.98703714 12.8125 24.875 C16.09245512 27.06163675 19.30717507 28.62726449 22.94921875 30.10546875 C25 31 25 31 28 33 C27.3709375 33.21914063 26.741875 33.43828125 26.09375 33.6640625 C16.70702998 37.14167263 10.22944365 41.24104744 5.25390625 50.12109375 C3.03430826 55.21718011 1.9742836 60.54743041 1 66 C0.67 66 0.34 66 0 66 C-0.14695312 65.09378906 -0.29390625 64.18757813 -0.4453125 63.25390625 C-2.45514093 52.33845876 -5.55241833 44.72883331 -14.83203125 38.28515625 C-18.40504238 36.167101 -22.13939222 34.51922065 -26 33 C-23.42036472 31.28024315 -21.05405945 30.08825997 -18.25 28.8125 C-10.70136984 25.03818492 -5.93690921 20.28688774 -2.77734375 12.421875 C-1.47089429 8.35152994 -0.6691099 4.2171532 0 0 Z " fill="#fff" transform="translate(26,0)"/>
                        </svg>
                    </div>
                    <span className="ml-5 text-4xl font-bold leading-[1.2] syne-font">Quienes Somos</span>
                    <div className="absolute right-40 top-40">
                        
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="63" height="67" fill="#ffffff">
                            <path d="M0 0 C12.68041759 -1.47446716 24.44008684 7.24084731 34.1875 14.3125 C47.34543311 26.88563609 55.5814563 42.98726411 58 61 C55.525 61.495 55.525 61.495 53 62 C52.82460693 61.42668945 52.64921387 60.85337891 52.46850586 60.26269531 C46.43426389 40.77015857 39.34325574 23.42218106 20.87109375 12.49609375 C14.15481749 8.99631986 7.18970902 6.34700989 0 4 C0 2.68 0 1.36 0 0 Z " fill="#fff" transform="translate(5,0)"/>
                            <path d="M0 0 C10.82282835 0.18660049 21.48913041 5.60562404 29.265625 13.06640625 C37.94987588 22.74817244 45.5312837 35.71790745 45 49 C43.11328125 48.859375 43.11328125 48.859375 41 48 C39.98046875 45.515625 39.98046875 45.515625 39.1875 42.25 C35.2433362 28.30783959 28.35936881 16.94327047 15.5625 9.6875 C10.50771737 7.12441107 5.31546091 4.96014828 0 3 C0 2.01 0 1.02 0 0 Z " fill="#fff" transform="translate(0,18)"/>
                            </svg>
                            
                    </div>
                    </div>

                    <ScrollFillTextAdvanced 
                    lines={[
                        "We are a creative digital agency",
                        "specializing in innovative design", 
                        "and cutting-edge development."
                    ]}
                    fillColor="#ffffff"
                    strokeColor="#666666"
                    fontSize="clamp(2.5rem, 8vw, 8rem)"
                    blurAmount={12}
                    animationDuration={1.0}
                    />


                    <div className="pb-32 pt-20">
                    <CustomButton className=" syne-font" onClick={() => console.log('Clicked!')}>
                        Mas sobre nosotros
                    </CustomButton>
                    </div>
                
                </div>
            </section>
        </>
    );
}