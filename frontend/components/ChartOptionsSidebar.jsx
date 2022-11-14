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
          <li>
            <GenerateChartButton
              id="playlistLengthPerPerson"
              label="Total playlist length per collaborator"
              func={generateChart}
            />
          </li>
          <li>
            <GenerateChartButton
              id="avgLengthPerLetter"
              label="Average song length per letter"
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
              label="Percentage of playlist per collaborator (song amount)"
              func={generateChart}
            />
          </li>
          <li>
            <GenerateChartButton
              id="playlistLengthPerPersonPercent"
              label="Percentage of playlist per collaborator (song length)"
              func={generateChart}
            />
          </li>
          <li>
            <GenerateChartButton
              id="lengthPerLetter"
              label="Length per first character as %"
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
      className="underline transition-colors font-barlow-bold hover:text-orange"
      onClick={() => func(id)}
    >
      {label}
    </button>
  );
}
