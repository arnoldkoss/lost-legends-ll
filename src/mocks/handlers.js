import { rest } from "msw";

const baseURL = 'https://drfapill-6d3c36398683.herokuapp.com/'


export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
      return res(
        ctx.json({
            pk: 4,
            username: "andikoss",
            email: "",
            first_name: "",
            last_name: "",
            detectorist_id: 4,
            detectorist_image: "https://res.cloudinary.com/dt2tgvarq/image/upload/v1/media/../default_pic_jgfgzn"
            })
      );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
      return res(ctx.status(200));
    }),
  ];