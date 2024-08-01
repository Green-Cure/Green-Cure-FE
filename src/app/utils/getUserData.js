import request from "./request";

export const getUserData = async () => {
  let userData;
  await request
    .get("/auth/my")
    .then(function (response) {
      if (response.data) {
        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
          userData = response.data.data[0].user;
        } else {
          // window.alert("Gagal mengambil data user");
          // return null;
        }
      } else {
        // window.alert("Gagal mengambil data user");
        // return null;
      }
    })
    .catch(function (err) {
      console.log(err);
    });

  return userData;
};
