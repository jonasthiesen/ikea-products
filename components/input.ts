import {styled} from "@/stitches.config"

export const Input = styled("input", {
  // backgroundColor: "$loContrast",
  fontFamily: "$sans",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "$gray4",
  borderRadius: "$2",
  variants: {
    size: {
      "1": {
        fontSize: "$3",
        height: "$5",
        px: "$1",
      },
      "2": {
        fontSize: "$4",
        height: "$6",
        px: "$2",
      },
      "3": {
        fontSize: "$5",
        height: "$7",
        px: "$3",
      },
    },
  },
  defaultVariants: {
    size: "3",
  },
})
