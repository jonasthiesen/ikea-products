import {styled} from "@/stitches.config"

export const Stack = styled("div", {
  display: "flex",
  variants: {
    spacing: {
      "0": {
        gap: 0,
      },
      "1": {
        gap: "$1",
      },
      "2": {
        gap: "$2",
      },
      "3": {
        gap: "$3",
      },
      "4": {
        gap: "$4",
      },
      "5": {
        gap: "$5",
      },
      "6": {
        gap: "$6",
      },
      "7": {
        gap: "$7",
      },
      "8": {
        gap: "$8",
      },
      "9": {
        gap: "$9",
      },
    },
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },
  },
  defaultVariants: {
    spacing: "2",
    direction: "column",
  },
})
