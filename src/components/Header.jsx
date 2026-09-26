function Header() {
  return (
    <header className="app-header">
      <div className="greeting">
        <div className="avatar" aria-hidden="true">N</div>
        <div>
          <p>Good Morning!</p>
          <h1>My Notes</h1>
        </div>
      </div>
      <button className="icon-button" type="button" aria-label="Notifications">♧</button>
    </header>
  );
}

export default Header;