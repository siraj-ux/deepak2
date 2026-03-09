// src/hooks/useFacebookPixel.ts
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    __fbqLoading?: boolean;
    __fbqInitialized?: boolean;
  }
}

const PIXEL_ID = "1953633955426093";
const PIXEL_ID_2 = "2043693512875067";

interface PixelOptions {
  eventName?: string;
  eventParams?: Record<string, any>;
}

export function useFacebookPixel({ eventName, eventParams }: PixelOptions = {}) {
  useEffect(() => {
    const ensureLoadedAndTrack = () => {
      if (!window.__fbqInitialized && window.fbq) {
        window.fbq("init", PIXEL_ID);
        window.fbq("init", PIXEL_ID_2);
        window.fbq("track", "PageView");
        window.__fbqInitialized = true;
      }
      if (eventName && window.fbq) {
        window.fbq("track", eventName, eventParams || {});
      }
    };

    // If fbq already exists, init (once) and track
    if (window.fbq) {
      ensureLoadedAndTrack();
      return;
    }

    // Avoid injecting the script twice
    if (window.__fbqLoading) {
      // Another instance is loading it; poll briefly until available
      const i = setInterval(() => {
        if (window.fbq) {
          clearInterval(i);
          ensureLoadedAndTrack();
        }
      }, 50);
      setTimeout(() => clearInterval(i), 5000);
      return;
    }

    window.__fbqLoading = true;

    // Create fbq shim and inject script
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
      t.id = "facebook-pixel-script"; // helpful guard
      s = b.getElementsByTagName(e)[0];
      s.parentNode!.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js", null, null, null);

    // When the script attaches fbq, finalize init/track
    const check = setInterval(() => {
      if (window.fbq) {
        clearInterval(check);
        ensureLoadedAndTrack();
      }
    }, 50);
    setTimeout(() => clearInterval(check), 5000);
  }, [eventName, eventParams]);
}
