export default function ChartOptionsSidebar({ generateChart }) {
  return (
    <ul>
      <li>
        <span>📊 Bar charts</span>
        <ul>
          <li>
            <button
              className="underline font-barlow-bold transition-colors hover:text-orange"
              onClick={() => generateChart("numberPerArtist")}
            >
              Number of songs per artist
            </button>
          </li>
        </ul>
      </li>
    </ul>
  );
}
