import { getGitHubContributions } from "@/services/getGitHubContributions";
import { GitHubContributionsGrid } from "../../Molecules/GitHubContributions";

export const GitHubContributionsContainer = async () => {
  const contributions = await getGitHubContributions();
  return <GitHubContributionsGrid contributions={contributions} />;
};
