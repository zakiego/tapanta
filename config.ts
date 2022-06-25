export const config = {
  hookreceiver: "https://test.merawathafalan.my.id/hook",
  tg: {
    token: process.env.TG_API_TOKEN,
    url: "https://api.telegram.org/bot" + process.env.TG_API_TOKEN,
  },
  group: {
    whatIReadToday: process.env.TG_GROUP_WHAT_I_READ_TODAY,
  },
};
