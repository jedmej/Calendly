
export const calendarVariants = {
  enter: (direction: "left" | "right") => ({
    x: direction === "right" ? -300 : 300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: "left" | "right") => ({
    x: direction === "right" ? 300 : -300,
    opacity: 0
  })
};
