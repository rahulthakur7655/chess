import { styles } from "../../styles/app/appStyles";

function LeaderboardPanel(props) {
  const { users } = props;

  return (
    <div style={styles.infoCard}>
      <span style={styles.infoLabel}>Leaderboard</span>
      <div style={styles.leaderboardList}>
        {users.length === 0 ? (
          <span style={styles.emptyState}>No ranked players yet</span>
        ) : (
          users.map((user, index) => (
            <div key={user.id} style={styles.leaderboardItem}>
              <strong>#{index + 1}</strong>
              <div>
                <div>{user.username}</div>
                <div style={styles.leaderboardMeta}>
                  {user.rank} • {user.rating}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LeaderboardPanel;
