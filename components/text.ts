import {styled} from "@/stitches.config"

export const Text = styled("p", {
  fontFamily: "$sans",
  color: "$hiContrast",
  variants: {
    size: {
      "1": {fontSize: "$1"},
      "2": {fontSize: "$2"},
      "3": {fontSize: "$3"},
      "4": {fontSize: "$4"},
      "5": {fontSize: "$5"},
      "6": {fontSize: "$6"},
      "7": {fontSize: "$7"},
      "8": {fontSize: "$8"},
      "9": {fontSize: "$9"},
    },
  },
  defaultVariants: {
    size: "3",
  },
})
