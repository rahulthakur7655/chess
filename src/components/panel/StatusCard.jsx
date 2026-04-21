import { styles } from "../../styles/app/appStyles";

function StatusCard(props) {
  const { status } = props;

  return (
    <div style={styles.statusCard}>
      <span style={styles.statusLabel}>Game status</span>
      <strong style={styles.statusText}>{status}</strong>
    </div>
  );
}

export default StatusCard;
