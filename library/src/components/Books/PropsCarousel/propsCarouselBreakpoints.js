const propsCarouselBreakpoints = {
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

export default propsCarouselBreakpoints;
