import { useEffect } from "react";

const PIXEL_ID = "1953633955426093";
const PIXEL_ID_2 = "2043693512875067";

export function useFacebookPixel() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Setup the fbq function if it doesn't exist
    if (!window.fbq) {
      (function (f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode!.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    }

    // 2. Initialize and track PageView
    window.fbq!("init", PIXEL_ID);
    window.fbq!("init", PIXEL_ID_2);
    window.fbq!("track", "PageView");
  }, []);
}