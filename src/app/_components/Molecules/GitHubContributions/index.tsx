import { GitHubContributions } from "@/types/api";
import css from "./index.module.scss";
import { ComponentProps, CSSProperties } from "react";

type GitHubContributionsProps = {
  contributions: GitHubContributions[];
};

const ContributionTile = (
  props: { tileColor: string } & ComponentProps<"div">,
) => {
  const { tileColor, ...rest } = props;
  const style = {
    "--tile-background-color": tileColor,
  } as CSSProperties;
  return <div className={css.contributionTile} style={style} {...rest} />;
};

const ContributionColumnContainer = (props: ComponentProps<"div">) => {
  return <div className={css.columnContainer} {...props} />;
};

const ContributionColumn = (props: { contribution: GitHubContributions }) => {
  const { contribution } = props;
  return (
    <ContributionColumnContainer>
      {contribution.contributionDays.map((cd, idx) => {
        return (
          <div
            key={idx}
            style={{
              paddingBottom:
                contribution.contributionDays.length - 1 === idx
                  ? "0"
                  : "0.1rem",
            }}
          >
            <ContributionTile tileColor={cd.color}></ContributionTile>
          </div>
        );
      })}
    </ContributionColumnContainer>
  );
};

const GitHubContributionsRow = (
  props: { backgroundColor: string } & ComponentProps<"div">,
) => {
  const { backgroundColor, ...rest } = props;
  const style = {
    "--column-container-background-color": backgroundColor,
  } as CSSProperties;
  return <div className={css.githubContributionsRow} style={style} {...rest} />;
};

export const GitHubContributionsGrid = (props: GitHubContributionsProps) => {
  const { contributions } = props;

  return (
    <>
      <a href="https://github.com/shoet" target="_black">
        <GitHubContributionsRow backgroundColor="">
          {contributions.map((c, idx) => {
            return (
              <div
                key={idx}
                style={{
                  marginLeft: 0 === idx ? "0" : "0.1rem",
                }}
              >
                <ContributionColumn contribution={c} />
              </div>
            );
          })}
        </GitHubContributionsRow>
      </a>
    </>
  );
};
