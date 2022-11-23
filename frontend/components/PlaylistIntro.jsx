import { useEffect, useRef } from 'react';
import anime from 'animejs';
import SplitType from 'split-type';

export default function PlaylistIntro({ initialStats }){
const statsContainerRef = useRef(null);
const singleAnimationDuration = 800;
const outAnimationDelay = 1500;

  useEffect(() => {
    if(!Array.isArray(initialStats) || !statsContainerRef?.current) return;
    const tl = anime.timeline({
      easing: 'easeOutCubic',
      duration: singleAnimationDuration,
    })

    const childNodes = Array.from(statsContainerRef.current.childNodes);

    // For every child, we add an animation to the timeline that consists of 2
    // things. First, we start by animating the value and label in (At the same
    // time, but from 'opposite' sides of the parent containers center.). Then,
    // after a delay (in which the user can read the statistic) we animate the
    // statistic out back to where it came from, untill all stats have been shown.
    
    for(let i = 0; i < childNodes.length; i++ ){
      const stat = childNodes[i];
      const statChildren = Array.from(stat.childNodes);
      const statValue = statChildren?.[0] || null;
      const splitValue = new SplitType(statValue, { types: 'words'})
      
      const statLabel = statChildren?.[1] || null;
      const splitLabel = new SplitType(statLabel, { types: 'words'})

      tl.add({
        targets: [statValue, statLabel],
        opacity: [0, 1],
        duration: 0
      })
      tl.add({
        targets: splitValue?.words,
        translateY: ['-100%', '0%'],
        opacity: [0, 1],
        rotate: ['-5deg', '0deg'],
        delay: anime.stagger(100)
      })
      tl.add({
        targets: splitLabel?.words,
        translateY: ['100%', '0%'],
        opacity: [0, 1],
        rotate: ['5deg', '0deg'],
        delay: anime.stagger(100)
      }, `-=${singleAnimationDuration}`)
      tl.add({
        targets: splitValue?.words.reverse(),
        translateY: ['0%', '-100%'],
        opacity: [1, 0],
        rotate: ['0deg', '-5deg'],
        delay: anime.stagger(100, {start: outAnimationDelay})
      })
      tl.add({
        targets: splitLabel?.words.reverse(),
        translateY: ['0%', '100%'],
        opacity: [1, 0],
        rotate: ['0deg', '5deg'],
        // No start delay, because the delay of the previous animation is already part
        // of the delay due to the -=singleAnimationDuration
        delay: anime.stagger(100)
      }, `-=${singleAnimationDuration}`)

    }
  }, [initialStats])
  
  // TODO: Check if this might have to change.
  if(!Array.isArray(initialStats)) return null
  
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen">
    {/* Same wrapper as in Popup */}
    <div className="absolute top-0 left-0 w-full h-full opacity-0 bg-text/20" />
    <div className="z-10 grid overflow-hidden" ref={statsContainerRef}>
      {initialStats.map((stat) => <div className="flex flex-col col-start-1 row-start-1 gap-2" key={stat.label}>
        <span className="gap-2 text-center opacity-0 font-barlow-bold text-heading-1 val">{stat.value}</span>
        <span className="gap-2 text-center opacity-0 text-heading-3 label">{stat.label}</span>
      </div>)}
    </div>
  </div>
  )
}