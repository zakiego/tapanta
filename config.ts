export const config = {
  hookreceiver: "https://test.merawathafalan.my.id/hook",
  tg: {
    token: process.env.TG_API_TOKEN,
    url: "https://api.telegram.org/bot" + process.env.TG_API_TOKEN,
  },
  group: {
    whatIReadToday: "-659752775",
  },
};
