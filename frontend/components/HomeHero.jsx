import anime from "animejs";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import Container from "./Container";
import Cta from "./Cta";
import HomeHeroIllustration from "./HomeHeroIllustration";

export default function HomeHero({ authLink }) {
  const headingTextRef = useRef(null);
  const welcomeText = useRef(null);
  const introText = useRef(null);
  const ctaButtonRef = useRef(null);
  const illustrationContainerRef = useRef(null);

  useEffect(() => {
    if (
      !introText?.current ||
      !headingTextRef?.current ||
      !welcomeText?.current ||
      !ctaButtonRef?.current ||
      !illustrationContainerRef?.current
    )
      return;

    const splitHeadingText = new SplitType(headingTextRef.current, {
      types: "chars",
    });
    const splitWelcomeText = new SplitType(welcomeText.current, {
      types: "words",
    });

    anime
      .timeline({
        easing: "easeOutCubic",
        duration: 800,
      })
      .add({
        targets: [headingTextRef.current, welcomeText.current],
        opacity: [0, 1],
        duration: 0,
      })
      .add(
        {
          targets: splitWelcomeText?.words,
          opacity: [0, 1],
          translateY: ["-2rem", "0"],
          rotate: ["-5deg", "0deg"],
          delay: anime.stagger(50),
        },
        0
      )
      .add(
        {
          targets: splitHeadingText?.chars,
          translateY: ["-5rem", "0"],
          opacity: [0, 1],
          rotate: ["-5deg", "0deg"],
          delay: anime.stagger(15),
        },
        0
      )
      .add(
        {
          targets: introText.current,
          opacity: [0, 1],
          translateX: ["-1.5rem", "0"],
        },
        "-=600"
      )
      .add(
        {
          targets: illustrationContainerRef.current,
          opacity: [0, 1],
          translateX: ["1.5rem", "0"],
        },
        "-=600"
      )
      .add({
        targets: ctaButtonRef.current,
        opacity: [0, 1],
        duration: 200,
      });
  }, []);

  return (
    <main className="min-h-screen py-10 md:py-24">
      <Container containerClass="grid gap-10 justify-center lg:justify-start homecontainer">
        {/* Texts */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <p
              className="overflow-hidden opacity-0 font-barlow-semibold"
              ref={welcomeText}
            >
              Welcome to
            </p>
            <h1
              className="pb-1.5 overflow-hidden text-heading-1 font-barlow-bold opacity-0 md:whitespace-nowrap xl:pb-7"
              ref={headingTextRef}
              id="test"
            >
              Spoti-Stats
            </h1>
          </div>
          <div className="flex flex-col items-start gap-4">
            <p className="max-w-sm opacity-0 lg:max-w-md" ref={introText}>
              Ever wondered which artists dominate your (collaborative)
              playlists, or what starting letter is the most common among your
              tracks? <br /> Wonder no longer.
            </p>
            <Cta
              isLink
              href={authLink}
              smallerText={false}
              passedRef={ctaButtonRef}
              className="opacity-0"
            >
              Get started
            </Cta>
          </div>
        </div>
        {/* Image */}
        <div className="hidden lg:block">
          <div ref={illustrationContainerRef} className="opacity-0">
            <HomeHeroIllustration />
          </div>
        </div>
      </Container>
    </main>
  );
}
