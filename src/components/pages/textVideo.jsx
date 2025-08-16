import TextMaskVideo from "../TextMaskVideo";
const videoSrc = "https://framerusercontent.com/assets/f2KpBvL8NEdg3mMuHN7FP9fRv4.mp4";

export default function TextVideo() {
    return (
        <>
            <section className="framer-rqqsrm z-10">
                
                <div className="framer-jcul6d" style={{
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                flexShrink: 0,
                transform: "rotate(-4deg)"
                }}>
                <TextMaskVideo text="KUNORO" videoSrc={videoSrc} />
                </div>
            </section>
        </>
    );
}