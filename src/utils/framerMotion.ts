export const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const item = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 },
};
