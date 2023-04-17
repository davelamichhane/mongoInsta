const { Auth } = require("aws-amplify");

export const checkLoggedInStatus = async cb => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch (err) {
    return false;
  }
};

