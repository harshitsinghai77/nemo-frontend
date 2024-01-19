// import { useState } from "react";
// import { Select, Spinner } from "grommet";

// import LofiSlider from "./slider";
// import LofiPlayer from "./yt-player";

// import "../../css/lofi/lofi.css";

// const LofiTitle = () => {
//   const [activeMoodTitle, setActiveMoodTitle] = useState("Study & Chill");
//   const [activeMoodOption, setActiveMoodOption] = useState([]);

//   const onMoodOptionChange = (newMood) => {
//     setActiveMoodOption(newMood);
//   };

//   const onActiveMoodChange = ({ option }) => {
//     onMoodTitleChange(option);
//   };

//   const onMoodTitleChange = (newActiveMood) => {
//     setActiveMoodTitle(newActiveMood);
//   };

//   return (
//     <>
//       <div className="title">
//         <div className="title__mood flex flex-row	items-baseline justify-center">
//           <p className="toggle_title mr-2">Choose your mood</p>
//           {activeMoodOption.length > 0 ? (
//             <Select
//               a11yTitle="Choose your mood"
//               dropHeight="medium"
//               plain
//               options={activeMoodOption}
//               value={activeMoodTitle}
//               onChange={onActiveMoodChange}
//             />
//           ) : (
//             <Spinner
//               align="center"
//               className="px-12"
//               color="#ffffff"
//               size="xsmall"
//             />
//           )}
//         </div>
//         <h1>{activeMoodTitle}</h1>
//       </div>
//       <LofiSlider activeMoodTitle={activeMoodTitle} />
//       <LofiPlayer
//         category={activeMoodTitle}
//         onMoodOptionChange={onMoodOptionChange}
//         onMoodTitleChange={onMoodTitleChange}
//       />
//     </>
//   );
// };

// export default LofiTitle;
