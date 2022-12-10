import anime from "animejs";
import { useEffect, useRef } from "react";

export default function CustomTable({ data }) {
  if (!Array.isArray(data?.bodyRows) || data.bodyRows.length < 1) return;

  const tableHeading = useRef(null);
  const tableBody = useRef(null);

  useEffect(() => {
    if (!tableBody?.current) return;

    const tl = new anime.timeline({
      easing: "easeOutCubic",
      duration: 600,
    });

    if (tableHeading?.current) {
      tl.add({
        targets: tableHeading.current.childNodes,
        translateX: ["-2rem", "0rem"],
        opacity: [0, 1],
        delay: anime.stagger(25),
      });
    }

    tl.add({
      targets: tableBody.current.childNodes,
      translateX: ["-2rem", "0rem"],
      opacity: [0, 1],
      delay: anime.stagger(50),
    });
  });

  return (
    <table>
      {data?.headerRow && Array.isArray(data?.headerRow) && (
        <thead ref={tableHeading}>
          <tr className="bg-gradient-dark-green">
            {data.headerRow.map((headerItem, i) => (
              <th key={i} className="px-2 py-1 border-px border-black/20">
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody ref={tableBody}>
        {data.bodyRows.map((row, i) => {
          return (
            <tr className="align-top even:bg-black/20" key={i}>
              {row.map((dataPoint, j) => (
                <td key={j} className="px-2 py-1 border-px border-black/20">
                  {dataPoint}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
