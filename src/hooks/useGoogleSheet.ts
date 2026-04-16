const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwEKAiMrWBN0e7C0W155ypRyf0c8JOmEHyqI98zKFIhATsklIPKSbpvcOjFnU-xYU_M/exec ";

export const useGoogleSheet = () => {
  const sendToGoogleSheet = async (payload: any) => {
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Google Sheet Error:", error);
    }
  };

  return { sendToGoogleSheet };
};