import { useEffect, useRef } from 'react';
import anime from 'animejs';
import SplitType from 'split-type';

export default function PlaylistIntro({ initialStats, playlistName }){
const statsContainerRef = useRef(null);
const nameContainerRef = useRef(null);
const singleAnimationDuration = 1000;
const outAnimationDelay = 1750;

  useEffect(() => {
    if(!Array.isArray(initialStats) || !statsContainerRef?.current || !nameContainerRef?.current) return;
    const tl = anime.timeline({
      easing: 'easeOutCubic',
      duration: singleAnimationDuration,
    })
    
    tl.add({
      targets: nameContainerRef.current,
      clipPath: ['circle(0.0% at 50% 50%);', 'circle(70.7% at 50% 50%)'],
      easing: 'easeInCubic',
      opacity: [0,1],
    })
    tl.add({
      targets: nameContainerRef.current,
      clipPath: ['circle(70.7% at 50% 50%)', 'circle(0.0% at 50% 50%)'],
      opacity: [1,0],
      delay: outAnimationDelay,
    })

    anime.set(statsContainerRef.current, {opacity: 1})
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
        targets: splitValue?.words,
        translateY: ['-100%', '0%'],
        opacity: [0, 1],
        rotate: ['-5deg', '0deg'],
        delay: anime.stagger(100),
        begin: function() {
          anime.set([statValue, statLabel], { opacity: 1 })
        }
      }, i === 0 ? "-=0" : `-=${0.8 * singleAnimationDuration}`)
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
    <div className="z-10 grid overflow-hidden opacity-0" ref={statsContainerRef}>
      {initialStats.map((stat) => <div className="flex flex-col col-start-1 row-start-1 gap-2" key={stat.label}>
        <span className="gap-2 text-center opacity-0 font-barlow-bold text-heading-1 val">{stat.value}</span>
        <span className="gap-2 text-center opacity-0 text-heading-3 label">{stat.label}</span>
      </div>)}
    </div>
    <h1 className="absolute w-full px-4 text-center text-black -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 font-barlow-bold text-heading-1" ref={nameContainerRef}>
      {playlistName}
    </h1>
  </div>
  )
}