import toast from "react-hot-toast";
import request from "./request";

export const getArticlesData = async () => {
  let articles = null;
  await request
    .get("articles")
    .then(function (response) {
      if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
        if (response.data.data.length > 0) {
          articles = response.data.data;
        }
        toast.dismiss();
      } else if (response.data.statusCode === 500) {
        console.error("INTERNAL_SERVER_ERROR");
        toast.dismiss();
        toast.error("Server Error");
      } else {
        toast.dismiss();
        toast.error("An unexpected error occurred");
      }
    })
    .catch((err) => {
      console.error(err);
      toast.dismiss();
      toast.error("An unexpected error occurred");
    });
  return articles;
};
