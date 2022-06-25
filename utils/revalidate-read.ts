import fetch from "node-fetch-native";

const revalidateReadingList = async () => {
  const resp = await fetch(
    `https://zakiego.my.id/api/revalidate?path=/read&password=${process.env.PASSWORD_REVALIDATE_ZAKIEGO}`,
  ).then((resp) => resp.json());

  return resp.revalidated;
};

export default revalidateReadingList;
