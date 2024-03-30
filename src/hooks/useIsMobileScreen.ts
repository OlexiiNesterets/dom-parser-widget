import { useState, useEffect } from "react";

enum Screen {
    MOBILE = 768,
}

const getIsMobile = () => {
    const mobileScreenWidth = Screen.MOBILE;
    return Number(top?.innerWidth) <= mobileScreenWidth;
};

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(getIsMobile());

    useEffect(() => {
        const onResize = () => {
            setIsMobile(getIsMobile());
        }

        window.addEventListener("resize", onResize);
    
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);
    
    return isMobile;
}