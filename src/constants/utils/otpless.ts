
export const getEmailPhoneNumber = (otplessUser) => {
  let email = "";
  let mobileNumber = "";
  //check if user exist
  otplessUser.identities?.map((identity) => {
    if (identity.identityType === "EMAIL") {
      email = identity.identityValue;
    }
    if (identity.identityType === "PHONE") {
      mobileNumber = identity.identityValue;
    }
  });
  return {
    email,
    mobileNumber,
  };
};
