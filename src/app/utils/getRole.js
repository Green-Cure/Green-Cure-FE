import request from "./request";

export const getRole = async () => {
  let role;
  await request
    .get("/auth/my")
    .then(function (response) {
      if (response.data) {
        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
          localStorage.setItem("role", response.data.data[0].user.role);
          role = response.data.data[0].user.role;
        } else {
          // window.alert("Gagal mengambil role");
          role = null;
        }
      } else {
        // window.alert("Gagal mengambil role");
        role = null;
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  return role;
};
