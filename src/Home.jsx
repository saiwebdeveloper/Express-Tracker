export default function Home() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const logout = () => {
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="container mt-5">
      <h2>Welcome {user?.name}</h2>
      <img src={user?.picture} alt="profile" />
      <br /><br />

      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
