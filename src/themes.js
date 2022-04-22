export const themePrimaryColor = "rgb(92, 229, 180)";

export const theme = {
  global: {
    colors: {
      brand: themePrimaryColor,
    },
  },
  rangeInput: {
    thumb: {
      color: "rgb(255, 255, 255)",
      extend: {
        height: "14px",
        width: "14px",
        marginTop: "-6px",
        marginLeft: "-7px",
      },
    },
    track: {
      color: "rgb(255, 255, 255)",
      height: "2px",
    },
    extend: {
      boxShadow: "none",
    },
  },
  checkBox: {
    color: themePrimaryColor,
    border: {
      color: themePrimaryColor,
    },
    hover: {
      border: {
        color: themePrimaryColor,
      },
    },
  },
  tab: {
    color: "black",
    active: {
      color: themePrimaryColor,
    },
    border: {
      color: "black",
      active: {
        color: themePrimaryColor,
      },
    },
  },

  table: {
    extend: {
      color: "black",
    },
  },
};
