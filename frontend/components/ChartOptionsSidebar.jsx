export default function ChartOptionsSidebar({ generateChart }) {
  return (
    <ul>
      <li>
        <span>📊 Bar charts</span>
        <ul>
          <li>
            <GenerateChartButton
              id="numberPerArtist"
              label="Number of songs per artist"
              func={generateChart}
            />
          </li>
        </ul>
      </li>
      <li>
        <span>🥧Pie charts</span>
        <ul>
          <li>
            <GenerateChartButton
              id="percentagePerLetter"
              label="Percentage of playlist per letter"
              func={generateChart}
            />
          </li>
          <li>
            <GenerateChartButton
              id="songsPerPerson"
              label="Percentage of playlist added by person"
              func={generateChart}
            />
          </li>
        </ul>
      </li>
    </ul>
  );
}

function GenerateChartButton({ id, label, func }) {
  return (
    <button
      className="underline font-barlow-bold transition-colors hover:text-orange"
      onClick={() => func(id)}
    >
      {label}
    </button>
  );
}
