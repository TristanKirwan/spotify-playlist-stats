export default function CustomTable({ data }) {
  if(!Array.isArray(data?.bodyRows) || data.bodyRows.length < 1) return;

  return <table>
    {data?.headerRow && Array.isArray(data?.headerRow) && <thead>
      <tr className="bg-gradient-dark-green">
        {data.headerRow.map((headerItem, i) => <th key={i} className="px-2 py-1 border-px border-black/20">{headerItem}</th>)}
      </tr>
    </thead>}
    <tbody>
      {data.bodyRows.map((row, i) => {
        return <tr className="odd:bg-dark-blue even:bg-green" key={i}>
          {row.map((dataPoint, j) => <td key={j} className="px-2 py-1 border-px border-black/20">{dataPoint}</td>)}
        </tr>
      })}
    </tbody>
  </table> 
}