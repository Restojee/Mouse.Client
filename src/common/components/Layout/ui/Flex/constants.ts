export const jcPrx = "jc";
export const alignPrx = "ai"
export const flexStyles = {
  core: "Flex",
  justify: {
    center: `${jcPrx}_center`,
    start: `${jcPrx}_start`,
    end: `${jcPrx}_end`,
    around: `${jcPrx}_around`,
    between: `${jcPrx}_between`,
  },
  align: {
    center: `${alignPrx}_center`,
    start: `${alignPrx}_start`,
    end:  `${alignPrx}_end`,
  },
  direction: {
    row: "row",
    column: "column",
  },
} as const;