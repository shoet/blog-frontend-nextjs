import { type ComponentProps, Suspense } from "react";
import { TagsContainer } from "../TagsContainer";
import { GitHubContributionsContainer } from "../GitHubContributionsContainer";
import { ClientKeywordSearchForm } from "../ClientKeywordSearchForm";
import { ClientProfile } from "../ClientProfile";
import { SkeletonLoader } from "../../Molecules/SkeletonLoader";
import { TableOfContent } from "../TableOfContent";
import clsx from "clsx";

type SideMenuProps = ComponentProps<"div">;

export const SideMenu = async (props: SideMenuProps) => {
  const { children, ...rest } = props;
  return (
    <div className={clsx("flex flex-col gap-6")} {...rest}>
      <TableOfContent />
      <ClientProfile />
      <ClientKeywordSearchForm />
      <Suspense fallback={<SkeletonLoader />}>
        <TagsContainer />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <GitHubContributionsContainer />
      </Suspense>
    </div>
  );
};
