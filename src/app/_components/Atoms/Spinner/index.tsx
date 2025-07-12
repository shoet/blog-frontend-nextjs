import styles from "./index.module.scss";

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <svg
        height={100}
        width={100}
        viewBox="0 0 100 100"
        style={{
          fill: "none", // 塗りつぶしなし
        }}
      >
        <title>Loading...</title>
        <circle
          className={styles.circle}
          cx={50} // 中心点のx座標
          cy={50} // 中心点のy座標
          r={40} // 半径 (strokeWidthが10なので、viewBox=100x100に収まるように半径が(40+10)=50になるようにしている)
          style={{
            stroke: "gray", // 線の色
            strokeWidth: 10, // 線の幅
          }}
        />
      </svg>
    </div>
  );
};
