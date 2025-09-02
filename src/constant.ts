export const APP_TITLE = "shoet Blog";
export const APP_DESCRIPTION = "shoet Blog";
export const API_BASE_URL = process.env.API_HOST;
export const CDN_HOST = process.env.CDN_HOST;
export const DOMAIN_NAME = process.env.DOMAIN_NAME;

export const BLOG_PER_PAGE = 5;

export const OGP_INFO = {
  type: "website",
  locale: "ja_JP",
  url: `https://${DOMAIN_NAME}/`,
  siteName: APP_TITLE,
  images: [
    {
      url: `https://${DOMAIN_NAME}/icon.png`,
      type: "image/png",
    },
  ],
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};
