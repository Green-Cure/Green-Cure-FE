import request from "./request";

export const getUserData = async () => {
  let userData = null;
  await request
    .get("auth/my")
    .then(function (response) {
      if (response.data) {
        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
          userData = response.data.data[0].user;
        }
      }
    })
    .catch(function (err) {
      console.log(err);
    });

  return userData;
};
