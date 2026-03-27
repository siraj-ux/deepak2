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
  pixelId?: string; // ✅ optional single pixel control
}

export function useFacebookPixel({
  eventName,
  eventParams,
  pixelId,
}: PixelOptions = {}) {
  useEffect(() => {
    const ensureLoadedAndTrack = () => {
      // ✅ Initialize pixels once
      if (!window.__fbqInitialized && window.fbq) {
        window.fbq("init", PIXEL_ID);
        window.fbq("init", PIXEL_ID_2);
        window.fbq("track", "PageView");
        window.__fbqInitialized = true;
      }

      // ✅ Track events
      if (eventName && window.fbq) {
        if (pixelId) {
          // 🔥 Fire only for specific pixel
          window.fbq("trackSingle", pixelId, eventName, eventParams || {});
        } else {
          // 🔥 Fire for all pixels
          window.fbq("track", eventName, eventParams || {});
        }
      }
    };

    // Already loaded
    if (window.fbq) {
      ensureLoadedAndTrack();
      return;
    }

    // If script is loading elsewhere
    if (window.__fbqLoading) {
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

    // Inject Facebook Pixel script
    (function (f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      t.id = "facebook-pixel-script";
      s = b.getElementsByTagName(e)[0];
      s.parentNode!.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js",
      null,
      null,
      null
    );

    // Wait for fbq to be ready
    const check = setInterval(() => {
      if (window.fbq) {
        clearInterval(check);
        ensureLoadedAndTrack();
      }
    }, 50);

    setTimeout(() => clearInterval(check), 5000);
  }, [eventName, eventParams, pixelId]);
}