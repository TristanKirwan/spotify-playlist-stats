import anime from "animejs";
import { useEffect, useRef, useState } from "react";
import { useFetcher } from '@remix-run/react';
import SplitType from "split-type";
import Container from "../components/Container";
import Cta from "../components/Cta";
import NoDataIllustration from "../components/NoDataIllustration";
import PlaylistPopup from "../components/PlaylistPopup";
import PlaylistIntro from '../components/PlaylistIntro';
import getInitialStats from '../utils/getInitialStats'

export default function StatsPage() {
  const [data, setData] = useState(null);
  const [initialPlaylistStats, setInitialPlaylistStats] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const introTitleRef = useRef(null);
  const introTextRef = useRef(null);
  const openPopupButtonRef = useRef(null);
  const introIllustrationRef = useRef(null)
  const fetcher = useFetcher();

  useEffect(() => {
    if (
      !introTitleRef?.current ||
      !introTextRef?.current ||
      !openPopupButtonRef?.current ||
      !introIllustrationRef?.current
    )
      return;

    const splitIntroTitle = new SplitType(introTitleRef.current, { types: 'words'})
    anime.timeline({
      easing: 'easeOutCubic',
      duration: 800,
    })
    .add({
      targets: introIllustrationRef.current,
      opacity: [0, 1],
      translateX: ['4rem', '0']
    })
    .add({
      targets: introTitleRef.current,
      opacity: [0, 1],
      duration: 0
    })
    .add({
      targets: splitIntroTitle?.words,
      opacity: [0, 1],
      translateY: ['-4rem', '0'],
      rotate: ["-5deg", "0deg"],
      delay: anime.stagger(50),
    })
    .add({
      targets: introTextRef.current,
      opacity: [0, 1],
      translateX: ['-1.5rem', '0'],
    }, "-=600")
    .add({
      targets: openPopupButtonRef.current,
      opacity: [0, 1],
      duration: 200,
    })
  },[])

  useEffect(() => {
    if(!Array.isArray(data) && Array.isArray(fetcher.data) && introTitleRef?.current && introTextRef?.current && openPopupButtonRef?.current && introIllustrationRef?.current) {
      const splitIntroTitle = new SplitType(introTitleRef.current, { types: 'words'})
      // Do animation and change the data state of this component.
      const tl = anime.timeline({
        easing: 'easeOutCubic',
        duration: 800,
        autoplay: false,
        complete: function(){ 
          setData(fetcher.data)
          console.log('fetcher.data', fetcher.data);
          const initialStats = getInitialStats(fetcher.data)
          setInitialPlaylistStats(initialStats)
        }
      })
      .add({
        targets: openPopupButtonRef.current,
        opacity: [1, 0],
        duration: 200,
      })
      .add({
        targets: introTextRef.current,
        opacity: [1, 0],
        translateX: ['0,', '-1.5rem'],
      })
      .add({
        targets: splitIntroTitle?.words,
        opacity: [1, 0],
        translateY: ['0', '-4rem'],
        delay: anime.stagger(50),
      }, "-=200")
      .add({
        targets: introTitleRef.current,
        opacity: [0, 1],
        duration: 0
      }, "-=0")
  
      // Illustration looking around
      for(let i = 0; i < 5; i++) {
        tl.add({
          targets: introIllustrationRef.current,
          scaleX: i % 2 === 0 ? [1, -1] : [-1, 1], 
          duration: 0,
          delay: 200
        })
      }
      
      tl.add({
        targets: introIllustrationRef.current,
        translateX: ['0rem', '4rem'],
        scaleX: -1,
        opacity: [1, 0]
      })
  
      tl.play();

    }
  }, [fetcher.data, data])
  
  return <div className="py-12">
    <PlaylistPopup isOpen={showPopup} closeCallBack={() => setShowPopup(false)} fetcher={fetcher}/>
    <div>
      {Array.isArray(data) ? <div>
        <PlaylistIntro initialStats={initialPlaylistStats} />
      </div> :
      <Container>
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-center">
          <div className="flex flex-col items-center gap-4">
            <span className="max-w-sm overflow-hidden text-center opacity-0 font-barlow-bold text-heading-3 md:max-w-none" ref={introTitleRef}>
              A wanderer is not always lost.
            </span>
            <p className="max-w-sm overflow-hidden leading-tight text-center opacity-0 text-body-2 md:max-w-xl" ref={introTextRef}>
              But sometimes, they can use a little direction. <br /> Get started by selecting a playlist.
            </p>
            <Cta onClick={() => setShowPopup(true)} passedRef={openPopupButtonRef} className="opacity-0">
              Select Playlist  
            </Cta>  
          </div>
          <div className="w-4/12 max-w-xs scale-x-100 opacity-0 md:max-w-tiny xl:max-w-xxs" ref={introIllustrationRef}>
            <NoDataIllustration />
          </div>
        </div> 
      </Container>
      }
    </div>
  </div>
}