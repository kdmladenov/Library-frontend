const bookCarouselBreakpoints = {
  desktopMax: {
    breakpoint: { max: 3000, min: 1080 },
    items: 7,
    slidesToSlide: 7, // optional, default to 1.
  },
  desktopHigh: {
    breakpoint: { max: 1080, min: 925 },
    items: 6,
    slidesToSlide: 6, // optional, default to 1.
  },
  desktopMid: {
    breakpoint: { max: 925, min: 771 },
    items: 5,
    slidesToSlide: 5, // optional, default to 1.
  },
  desktopMin: {
    breakpoint: { max: 771, min: 617 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 617, min: 464 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
};

const bookDetailsCarouselBreakpoints = {
  desktop: {
    breakpoint: { max: 4000, min: 750 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  desktopMin: {
    breakpoint: { max: 750, min: 600 },
    items: 3,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 600, min: 450 },
    items: 2,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 450, min: 0 },
    items: 1,
    slidesToSlide: 2, // optional, default to 1.
  },
};

export { bookCarouselBreakpoints, bookDetailsCarouselBreakpoints };
