const { Auth } = require("aws-amplify");

export const checkLoggedInStatus = async cb => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch (err) {
    return false;
  }
};


export function uuid() {
  const arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uuid = "";
  for (let i = 1; i < 20; i++) {
    const index = Math.floor(Math.random() * 36);
    uuid += i % 5 === 0 ? "-" : arr[index];
  }
  return uuid;
}
