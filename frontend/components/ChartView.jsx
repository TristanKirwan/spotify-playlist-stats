import clsx from "clsx";
import { useState } from "react";
import ChartRenderer from "../components/charts/ChartRenderer";
import Container from "../components/Container";
import Icon from "../components/Icon/Icon";
import generateChart from "../utils/generatechart";

const graphOptions = [
  {
    groupTitle: "Bar charts",
    groupIcon: "barChart",
    children: [
      {
        id: "numberPerArtist",
        label: "Number of songs per artist (min 2.)",
        iconType: "hashtag",
      },
      {
        id: "playlistLengthPerPerson",
        label: "Total playlist length per collaborator",
        iconType: "user",
      },
      {
        id: "avgLengthPerLetter",
        label: "Average song length per letter",
        iconType: "clock",
      },
      {
        id: "avgPopularityPerPerson",
        label:
          "Average song popularity per person (based on spotify's popularity index)",
        iconType: "heart",
      },
      {
        id: "maxOfArtistPerPerson",
        label: "Highest # of songs of 1 artist",
        iconType: "hashtag",
      },
    ],
  },
  {
    groupTitle: "Pie charts",
    groupIcon: "pieChart",
    children: [
      {
        id: "percentagePerLetter",
        label: "Percentage of playlist per letter",
        iconType: "squareStack",
      },
      {
        id: "songsPerPerson",
        label: "Percentage of playlist per collaborator (song amount)",
        iconType: "hashtag",
      },
      {
        id: "playlistLengthPerPersonPercent",
        label: "Percentage of playlist per collaborator (song length)",
        iconType: "clock",
      },
      {
        id: "lengthPerLetter",
        label: "Length per first character as %",
        iconType: "clock",
      },
    ],
  },
  {
    groupTitle: "Tables",
    groupIcon: "table",
    children: [
      {
        id: "longestShortestSongPerLetter",
        label: "Longest and shortest song per letter",
        iconType: "clock",
      },
    ],
  },
];

export default function ChartView({ playlistName, data }) {
  const [chartOptions, setChartOptions] = useState(null);

  function graphItemClick(id) {
    const chartOptions = generateChart(id, data);
    setChartOptions(chartOptions);
  }

  return (
    <div>
      <Container containerClass="graph-view-container md:items-start">
        <aside className="py-12 md:min-h-screen md:sticky md:top-0">
          <ul className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 md:flex md:flex-col">
            {Array.isArray(graphOptions) &&
              graphOptions.length > 0 &&
              graphOptions.map((group) => {
                if (
                  !Array.isArray(group?.children) ||
                  group.children.length <= 0
                )
                  return;
                return (
                  <li
                    className="pt-3 first:pt-0 sm:pt-0 md:w-full"
                    key={group?.groupTitle}
                  >
                    <Accordion
                      title={group?.groupTitle}
                      iconType={group?.groupIcon}
                    >
                      <ul className="flex flex-col gap-2">
                        {group?.children.map((child) => (
                          <li>
                            <GenerateChartButton
                              id={child?.id}
                              label={child?.label}
                              func={graphItemClick}
                              iconType={child?.iconType}
                              key={child?.id}
                            />
                          </li>
                        ))}
                      </ul>
                    </Accordion>
                  </li>
                );
              })}
          </ul>
        </aside>
        <main className="md:py-12">
          {playlistName && <h1>{playlistName}</h1>}
          {chartOptions ? (
            <ChartRenderer options={chartOptions} />
          ) : (
            <h2>Select a chart on the left side</h2>
          )}
        </main>
      </Container>
    </div>
  );
}

function GenerateChartButton({ id, label, func, iconType }) {
  return (
    <button
      className="flex text-left text-primary font-barlow-semibold text-body transition-colors hover:text-primary/60"
      onClick={() => func(id)}
    >
      {iconType && (
        <span className="inline-block w-3 aspect-square text-text mr-2 shrink-0 mt-px translate-y-1.5">
          <Icon type={iconType} />
        </span>
      )}
      <span>{label}</span>
    </button>
  );
}

function Accordion({ title, iconType, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="flex w-full relative pb-3 pr-8 border-b-2 border-black/20 text-text/80 transition-colors hover:text-text hover:border-black/50"
        aria-label={`Open accordion to view ${title} items.`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {(title || iconType) && (
          <span className="font-barlow-bold text-heading-4">
            {iconType && (
              <span className="inline-block w-6 translate-y-1 mr-1 opacity-80 transition-opacity group-hover:opacity-100 md:translate-y-2">
                <Icon type={iconType} />
              </span>
            )}
            {title && <span>{title}</span>}
          </span>
        )}
        <span
          className={clsx(
            "absolute top-3 right-1 w-6 aspect-square transition-transform md:top-5",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          <Icon type="chevron" />
        </span>
      </button>
      <div className={clsx("pt-2", isOpen ? "block" : "hidden")}>
        {children}
      </div>
    </div>
  );
}
