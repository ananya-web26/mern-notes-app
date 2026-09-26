function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="add-button"
      type="button"
      aria-label="Add a note"
    >
      +
    </button>
  );
}

export default AddButton;