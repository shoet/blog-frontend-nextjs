import { Comment } from "@/types/api";
import styles from "./index.module.scss";
import { AvatarImage } from "../../Molecules/AvatarImage";
import { toStringYYYYMMDD_HHMMSS_ja } from "@/utils/date";

export const CommentList = (props: { comments: Comment[] }) => {
  const { comments } = props;

  return (
    <div className={styles.commentList}>
      {comments.map((comment, idx) => {
        return (
          <div key={idx} className={styles.commentRow}>
            <div className={styles.avatar}>
              <AvatarImage
                imageURL={comment.avatarImageFileURL || "/avatar_default.png"}
              />
              <div className={styles.name}>
                {comment.nickname || comment.clientId}
              </div>
              <div className={styles.created}>
                {toStringYYYYMMDD_HHMMSS_ja(comment.created)}
              </div>
            </div>
            <div className={styles.content}>{comment.content}</div>
          </div>
        );
      })}
    </div>
  );
};
