import toast from "react-hot-toast";
import request from "./request";

export const getArticlesData = async () => {
  let articles = null;
  await request
    .get("articles")
    .then(function (response) {
      console.log(response);
      if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
        if (response.data.data.length > 0) {
          articles = response.data.data;
        }
        toast.dismiss();
        // setLoading(false);
      } else if (response.data.statusCode === 500) {
        console.error("INTERNAL_SERVER_ERROR");
        toast.dismiss();
        toast.error("Server Error");
        // setLoading(false);
      } else {
        toast.dismiss();
        toast.error("An unexpected error occurred");
        // setLoading(false);
      }
    })
    .catch((err) => {
      console.error(err);
      toast.dismiss();
      toast.error("An unexpected error occurred");
      //   setLoading(false);
    });
  return articles;
};
