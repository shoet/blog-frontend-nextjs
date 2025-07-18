import type { GitHubContributions } from "@/types/api";
import type { CSSProperties } from "react";
import clsx from "clsx";

type GitHubContributionsProps = {
  contributions: GitHubContributions[];
};

export const GitHubContributionsGrid = (props: GitHubContributionsProps) => {
  const { contributions } = props;
  return (
    <a href="https://github.com/shoet" target="_black">
      <div dir="ltr" className={clsx("flex flex-row justify-end gap-0.5 overflow-hidden")}>
        {
          contributions.map((w, idxX) => {
            return (
              <div
                // biome-ignore lint: lint/suspicious/noArrayIndexKey
                key={idxX}
                className={clsx("grid grid-flow-col grid-rows-7 gap-0.5")}
              >
                {
                  w.contributionDays.map((d) => {
                    const style = {
                      "--bg-color": d.color,
                    } as CSSProperties
                    return <div
                      key={d.date}
                      style={style}
                      className={clsx(`h-2.5 w-2.5 rounded-xs bg-[var(--bg-color)]`)} />
                  })
                }
              </div>
            )
          })
        }
      </div>
    </a>
  )
}
