import { FC } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors, typography } from "../../../styleVariables.stylex";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { usePerformance } from "../../../hooks/usePerformance";

const styles = stylex.create({
  root: {
    width: "258px",
    height: "263px",
    backgroundColor: colors.lightBlack,
    borderRadius: "5px",
    position: "relative",
  },
  customPolarAngleAxis: {
    fill: "white",
    fontSize: typography.sm,
  },
  helpText: {
    fontSize: typography.md,
    fill: "white",
  },
});

const CustomPolarAngleAxis: FC<{
  payload?: { value: string };
  x?: number;
  y?: number;
  cy?: number;
}> = ({ payload, x, y, cy, ...rest }) => {
  const getYPos = () => {
    if (payload!.value === "Intensité") return y! + (y! - cy!) / 10;
    if (payload!.value === "Endurance") return y! + (y! - cy!) / 6;

    return y;
  };

  return (
    <text
      {...rest}
      y={getYPos()}
      x={x}
      {...stylex.props(styles.customPolarAngleAxis)}
    >
      {payload!.value}
    </text>
  );
};

const Performance: FC = () => {
  const { data } = usePerformance();

  return (
    <div {...stylex.props(styles.root)}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={data}
          margin={{ top: 24, right: 24, bottom: 24, left: 24 }}
        >
          {data ? (
            <>
              <PolarGrid gridType="polygon" radialLines={false} />
              <PolarAngleAxis dataKey="kind" tick={<CustomPolarAngleAxis />} />
              <Radar dataKey="value" fill={colors.primary} fillOpacity={0.6} />
            </>
          ) : (
            <text
              x="50%"
              y="50%"
              dy={0}
              textAnchor="middle"
              dominantBaseline="middle"
              {...stylex.props(styles.helpText)}
            >
              Données non disponibles
            </text>
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Performance;
