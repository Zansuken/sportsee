import { FC } from "react";
import * as stylex from "@stylexjs/stylex";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { colors, typography } from "../../../styleVariables.stylex";
import { useScore } from "../../../hooks/useScore";

const styles = stylex.create({
  root: {
    width: "258px",
    height: "263px",
    backgroundColor: colors.lightGrey,
  },
  label: {
    fontSize: typography.md,
    fontWeight: 500,
    fill: "black",
  },
  value: {
    fontSize: typography.lg,
    fontWeight: "bold",
    fill: "black",
  },
  helpText: {
    fontSize: typography.md,
    fill: colors.grey,
  },
});

const Score: FC = () => {
  const { data, score } = useScore();

  return (
    <div {...stylex.props(styles.root)}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="70%"
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <text
            x="20"
            y="20"
            textAnchor="start"
            dominantBaseline="hanging"
            {...stylex.props(styles.label)}
          >
            Score
          </text>
          {score ? (
            <>
              <text
                x="50%"
                y="50%"
                dy={-20}
                textAnchor="middle"
                dominantBaseline="middle"
                {...stylex.props(styles.value)}
              >
                {score}%
              </text>
              <text
                x="50%"
                y="50%"
                dy={+10}
                textAnchor="middle"
                dominantBaseline="middle"
                {...stylex.props(styles.helpText)}
              >
                de votre
              </text>
              <text
                x="50%"
                y="50%"
                dy={+32}
                textAnchor="middle"
                dominantBaseline="middle"
                {...stylex.props(styles.helpText)}
              >
                objectif
              </text>
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
          <RadialBar dataKey="score" cornerRadius={"50%"} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Score;
