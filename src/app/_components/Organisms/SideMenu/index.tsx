import { type ComponentProps, Suspense } from "react";
import css from "./index.module.scss";
import { TagsContainer } from "../TagsContainer";
import { GitHubContributionsContainer } from "../GitHubContributionsContainer";
import { ClientKeywordSearchForm } from "../ClientKeywordSearchForm";
import { ClientProfile } from "../ClientProfile";
import { SkeletonLoader } from "../../Molecules/SkeletonLoader";
import { TableOfContent } from "../TableOfContent";

type SideMenuProps = ComponentProps<"div">;

export const SideMenu = async (props: SideMenuProps) => {
  const { children, ...rest } = props;
  return (
    <div className={css.sideMenu} {...rest}>
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
