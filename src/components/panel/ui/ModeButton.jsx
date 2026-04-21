import { styles } from "../../../styles/app/appStyles";

function ModeButton(props) {
  const { active, onClick, children } = props;

  return (
    <button
      onClick={onClick}
      style={{
        ...styles.segmentButton,
        ...(active ? styles.segmentButtonActive : {})
      }}
    >
      {children}
    </button>
  );
}

export default ModeButton;
