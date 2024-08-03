const { default: toast } = require("react-hot-toast");
const { default: request } = require("./request");

export const getReportDatas = async () => {
  let reportDatas = null;
  await request
    .get("report")
    .then(function (response) {
      if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
        if (response.data.data.length > 0) {
          reportDatas = response.data.data;
        }
      } else if (response.data.statusCode === 500) {
        console.error("INTERNAL_SERVER_ERROR");
        toast.dismiss();
        toast.error("Server Error");
      } else {
        toast.error("An unexpected error occurred");
      }
    })
    .catch((err) => {
      toast.error("An unexpected error occurred");
      console.error(err);
    });
  return reportDatas;
};
