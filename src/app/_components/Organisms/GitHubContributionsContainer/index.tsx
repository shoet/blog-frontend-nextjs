import { getGitHubContributions } from "@/services/getGitHubContributions";
import { GitHubContributionsGrid } from "../../Molecules/GitHubContributions";

export const GitHubContributionsContainer = async () => {
  const contributions = await getGitHubContributions();
  if (!contributions) return null;
  return <GitHubContributionsGrid contributions={contributions} />;
};
