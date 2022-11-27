import BarChart from "./types/BarChart";
import Chevron from "./types/Chevron";
import Clock from "./types/Clock";
import Cross from "./types/Cross";
import Hashtag from "./types/Hashtag";
import Heart from "./types/Heart";
import PieChart from "./types/PieChart";
import SquareStack from "./types/SquareStack";
import Table from "./types/table";
import User from "./types/User";

const icons = {
  cross: Cross,
  chevron: Chevron,
  barChart: BarChart,
  pieChart: PieChart,
  hashtag: Hashtag,
  clock: Clock,
  user: User,
  heart: Heart,
  squareStack: SquareStack,
  table: Table,
};

export default function Icon({ type = null, ...rest }) {
  const IconComp = icons[type];
  if (!type || type === "" || !IconComp) return null;
  return <IconComp {...rest} />;
}
