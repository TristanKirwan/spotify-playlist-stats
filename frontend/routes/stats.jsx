import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import ChartOptionsSidebar from "../components/ChartOptionsSidebar";
import ChartRenderer from "../components/charts/ChartRenderer";
import Cta from "../components/Cta";
import SquareLoader from "../components/SquareLoader";
import TextInput from "../components/TextInput";
import generateChart from "../utils/generatechart";
import getIntialStats from "../utils/getInitialStats";

import Container from '../components/Container'
import NoDataIllustration from '../components/NoDataIllustration';
import PlaylistPopup from "../components/PlaylistPopup";


export default function StatsPage(){
  const [data, setData] = useState(null);
  const [showPopup, setShowPopup] = useState(!Array.isArray(data));
  
  return <div className="py-12">
    <PlaylistPopup isOpen={showPopup} closeCallBack={() => setShowPopup(false)}/>
    <div>
      {Array.isArray(data) ? <div>

      </div> :
      <Container>
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-center">
          <div className="flex flex-col items-center gap-4">
            <span className="max-w-sm text-center font-barlow-bold text-heading-3 md:max-w-none">
              A wanderer is not always lost.
            </span>
            <p className="max-w-sm leading-tight text-center text-body-2 md:max-w-xl">
              But sometimes, they can use a little direction. <br /> Get started by selecting a playlist.
            </p>
            <Cta onClick={() => {console.log('?'); setShowPopup(true)}}>
              Select Playlist  
            </Cta>  
          </div>
          <div className="w-4/12 max-w-xs md:max-w-tiny xl:max-w-xxs">
            <NoDataIllustration />
          </div>
        </div> 
      </Container>
      }
    </div>
  </div>
}

// export default function Stats() {
//   // TODO: set to null
//   const [data, setData] = useState(null);
//   const [initialStats, setInitialStats] = useState(null);
//   const [chartData, setChartData] = useState(null);
//   const fetcher = useFetcher();

//   const textInput = useRef();
//   const submitButtonRef = useRef();

//   const noDataTextRef = useRef(null);
//   const loaderRef = useRef(null);
//   const graphContainerRef = useRef(null);

//   useEffect(() => {
//     if (fetcher.data) {
//       setData(fetcher.data);
//     }
//   }, [fetcher.data]);

//   useEffect(() => {
//     if (data) {
//       const initialStats = getIntialStats(data);
//       setInitialStats(initialStats);
//     }
//   }, [data]);

//   function fillInId(e, year = 2022) {
//     e.preventDefault();
//     if (!textInput?.current || !submitButtonRef?.current) return;

//     const playlistIds = {
//       2022: "3NQ42UOhvdXToVPoDkmSRG",
//       2021: "02TvflP0z04CtkSTMmY16H",
//       top2021Tristan: "37i9dQZF1EUMDoJuT8yJsl",
//     };
//     const idOfPlaylistYear = playlistIds[year];
//     if (!idOfPlaylistYear) return;

//     textInput.current.value = idOfPlaylistYear;

//     // Not sure why, but we cant just submit the form because then the form
//     // navigates to the action route.
//     submitButtonRef.current.click();
//   }

//   // Remove this
//   useEffect(() => {
//     if (textInput?.current && submitButtonRef?.current) {
//       textInput.current.value = "3NQ42UOhvdXToVPoDkmSRG";
//       submitButtonRef.current.click();
//     }
//   }, []);

//   function handleChartClick(chartName) {
//     const chartData = generateChart(chartName, data);
//     if (chartData) setChartData(chartData);
//   }

//   return (
//     <div className="min-h-screen stats-page-wrapper">
//       <aside className="px-4 py-10 border-b border-true-white/30 md:border-b-0 md:border-r">
//         <fetcher.Form
//           method="POST"
//           action="/actions/getPlaylistInfo"
//           encType="multipart/formdata"
//           className="flex flex-col gap-12 justify-start max-w-[400px]"
//         >
//           <div className="flex flex-col gap-4">
//             <p className="text-body-3">
//               Fill in the playlist ID to get started:
//             </p>
//             <label className="flex flex-col gap-2">
//               <span className="px-4">Playlist id</span>
//               <TextInput
//                 name="playlistID"
//                 required
//                 placeholder="Example: 3NQ42UOhvdXToVPoDkmSRG"
//                 passedRef={textInput}
//               />
//             </label>
//             <div>
//               {fetcher?.data && fetcher?.data?.error && (
//                 <span className="block mb-2">
//                   Something went wrong retrieving the playlist data. Please try
//                   again later.
//                 </span>
//               )}
//               <Cta isLink={false} passedRef={submitButtonRef}>
//                 Get data
//               </Cta>
//             </div>
//           </div>
//           <div>
//             <p className="mb-4 text-body-3">Or choose a preset:</p>
//             <div className="flex flex-wrap gap-2">
//               <Cta onClick={(e) => fillInId(e, 2021)}>Omroep Grunn</Cta>
//               <Cta onClick={(e) => fillInId(e, 2022)}>
//                 Zweden mixtape vol III
//               </Cta>
//               <Cta onClick={(e) => fillInId(e, "top2021Tristan")}>
//                 Tristan top 2021
//               </Cta>
//             </div>
//           </div>
//         </fetcher.Form>
//       </aside>
//       <main>
//         {/* NO data selected */}
//         {!data ? (
//           <div className="relative h-full px-4 py-10" ref={noDataTextRef}>
//             <h1 className="text-center font-barlow-bold text-heading-2">
//               <span className="hidden md:block">
//                 👈 Get started by getting playlist data
//               </span>
//               <span className="block md:hidden">
//                 👆 Get started by getting playlist data
//               </span>
//             </h1>
//             {/* Loader */}
//             {fetcher?.state && fetcher.state === "submitting" && (
//               <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/30">
//                 <SquareLoader />
//               </div>
//             )}
//           </div>
//         ) : (
//           // Data
//           <div className="grid justify-center gap-8 px-4 py-10 justify-items-center">
//             <div className="max-w-md">
//               <h2 className="text-center font-barlow-bold text-heading-4">
//                 To get you started, here are some general stats for this
//                 playlist:
//               </h2>
//             </div>
//             {Array.isArray(initialStats) && (
//               <div className="flex w-full gap-8 overflow-x-auto">
//                 {initialStats.map((stat, i) => (
//                   <div className="flex flex-col items-center shrink-0" key={i}>
//                     <span>{stat.label}</span>
//                     <span className="font-barlow-bold">{stat.value}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//             {/* Graph options buttons */}
//             <div className="flex flex-col w-full graph-container">
//               <ChartOptionsSidebar generateChart={handleChartClick} />
//               {chartData && (
//                 <div>
//                   <ChartRenderer options={chartData} />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
