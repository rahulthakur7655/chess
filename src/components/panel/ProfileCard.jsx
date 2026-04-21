import { styles } from "../../styles/app/appStyles";

function StatPill(props) {
  const { label, value } = props;

  return (
    <div style={styles.statPill}>
      <span style={styles.infoLabel}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProfileCard(props) {
  const { user, onLogout } = props;

  return (
    <div style={styles.infoCard}>
      <div style={styles.profileHeader}>
        <div>
          <span style={styles.infoLabel}>Signed in as</span>
          <h3 style={styles.profileName}>{user.username}</h3>
          <p style={styles.profileMeta}>
            {user.rank} • {user.rating} rating
          </p>
        </div>
        <button onClick={onLogout} style={styles.secondaryButton}>
          Logout
        </button>
      </div>

      <div style={styles.statsGrid}>
        <StatPill label="Wins" value={user.wins} />
        <StatPill label="Losses" value={user.losses} />
        <StatPill label="Draws" value={user.draws} />
      </div>
    </div>
  );
}

export default ProfileCard;
