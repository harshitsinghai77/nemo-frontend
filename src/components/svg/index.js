export const selectedColor = (
  <div className="color-pallete-check">
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.594.383c-.524-.51-1.433-.51-1.958 0L5.13 6.735 2.365 4.037c-.525-.512-1.438-.509-1.959 0a1.328 1.328 0 0 0 0 1.912l3.745 3.656c.26.255.61.395.979.395s.718-.14.978-.396l7.488-7.308c.54-.527.54-1.385-.002-1.913"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
    </svg>
  </div>
);

export const rainbow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 26 26"
    className="cursor-pointer"
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="#FA7900"
        d="M19.495 1.75L13 13V0c2.361 0 4.581.638 6.495 1.75z"
      ></path>
      <path
        fill="#FEBE12"
        d="M24.25 6.505L13 13l6.5-11.258a12.89 12.89 0 0 1 4.75 4.763z"
      ></path>
      <path
        fill="#FDD918"
        d="M25.99 13H13l11.258-6.5A12.89 12.89 0 0 1 25.99 13z"
      ></path>
      <path
        fill="#96D35B"
        d="M24.25 19.495L13 13h13a12.89 12.89 0 0 1-1.75 6.495z"
      ></path>
      <path
        fill="#63D386"
        d="M19.495 24.25L13 13l11.258 6.5a12.89 12.89 0 0 1-4.763 4.75z"
      ></path>
      <path
        fill="#52BAD5"
        d="M13 25.99V13l6.5 11.258A12.891 12.891 0 0 1 13 25.99z"
      ></path>
      <path
        fill="#0B8CE3"
        d="M6.505 24.25L13 13v13a12.89 12.89 0 0 1-6.495-1.75z"
      ></path>
      <path
        fill="#4940AA"
        d="M1.75 19.495L13 13 6.5 24.258a12.89 12.89 0 0 1-4.75-4.763z"
      ></path>
      <path
        fill="#8E368B"
        d="M.01 13H13L1.742 19.5A12.891 12.891 0 0 1 .01 13z"
      ></path>
      <path
        fill="#BD3559"
        d="M1.75 6.505L13 13H0c0-2.361.638-4.581 1.75-6.495z"
      ></path>
      <path
        fill="#D83939"
        d="M6.505 1.75L13 13 1.742 6.5a12.89 12.89 0 0 1 4.763-4.75z"
      ></path>
      <path
        fill="#FF5B5B"
        d="M13 .01V13L6.5 1.742A12.891 12.891 0 0 1 13 .01z"
      ></path>
      <path d="M0 0h26v26H0z"></path>
    </g>
  </svg>
);

export const pauseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M3 1a1 1 0 1 1 2 0v12a1 1 0 0 1-2 0V1zm6 0a1 1 0 1 1 2 0v12a1 1 0 0 1-2 0V1z"
      ></path>
      <path d="M0 0h14v14H0z"></path>
    </g>
  </svg>
);

export const playIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M5 2.869v8.262L11.197 7 5 2.869zm8.555 4.963l-9 6A1 1 0 0 1 3 13V1A1 1 0 0 1 4.555.168l9 6a1 1 0 0 1 0 1.664z"
      ></path>
      <path d="M0 0h14v14H0z"></path>
    </g>
  </svg>
);

export const settingsIcon = (textcolor, themePrimaryColor) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill={textcolor ? themePrimaryColor : "currentColor"}
        d="M6.44 0h1.12c.188 0 .355.12.415.3l.775 2.325h-3.5L6.025.299C6.085.121 6.252 0 6.44 0zM7.56 14.001H6.44a.438.438 0 0 1-.415-.3l-.775-2.325h3.5l-.775 2.326A.438.438 0 0 1 7.56 14zM11.554 1.655l.791.791a.438.438 0 0 1 .082.505l-1.096 2.193-2.475-2.475 2.193-1.096a.437.437 0 0 1 .505.082zM2.445 12.346l-.791-.792a.437.437 0 0 1-.082-.505l1.096-2.193 2.475 2.475-2.193 1.097a.437.437 0 0 1-.505-.082zM14 6.44v1.12c0 .187-.12.355-.299.414l-2.326.775v-3.5l2.326.776c.179.06.3.227.3.415zM0 7.56V6.44c0-.187.121-.355.3-.414l2.325-.776v3.5L.3 7.975A.438.438 0 0 1 0 7.56zM12.346 11.554l-.791.792a.437.437 0 0 1-.505.082L8.857 11.33l2.475-2.475 1.096 2.193a.438.438 0 0 1-.082.505zM1.655 2.446l.791-.792a.438.438 0 0 1 .505-.082L5.144 2.67 2.669 5.144 1.573 2.95a.438.438 0 0 1 .082-.505z"
      ></path>
      <path
        fill={textcolor ? themePrimaryColor : "currentColor"}
        fillRule="nonzero"
        d="M7 12A5 5 0 1 1 7 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      ></path>
      <path d="M0 0h14v14H0z"></path>
    </g>
  </svg>
);
