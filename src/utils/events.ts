declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      e: "event",
      action: string,
      variant_name: Record<string, string>,
    ) => void;
  }
}

type Payload = {
  id: string;
  win_option: string;
  sum_cred: string;
  srok_kredita: string;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      "https://script.google.com/macros/s/AKfycbzPKluFIZ9zZ1_HmivaJMF_NU7oIg8D50XaxGruKgI6mgLkfxH0xTCcWz3b-whvHt3S/exec",
      {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({
          date,
          variant: "ghk_3678_1",
          ...payload,
        }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      },
    );
  } catch (error) {
    console.error("Error!", error);
  }
};
