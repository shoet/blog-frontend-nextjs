import type { GitHubContributions } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";

export async function getGitHubContributions(): Promise<GitHubContributions[]> {
  const queryParams = new URLSearchParams();
  queryParams.append("username", "shoet");
  queryParams.append("num_of_latest_week", "50");
  const url = `/github/contributions_latest_week?${queryParams}`;
  return fetch(getAPIPath(url), {
    method: "GET",
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
