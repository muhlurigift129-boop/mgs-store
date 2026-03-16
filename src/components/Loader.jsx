export default function Loader() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#000",
      color: "#fff",
    }}>
      <img src="/logo.png" alt="Logo" width={150} />
      <h2>Welcome to MGS Store</h2>
      <p>Loading...</p>
    </div>
  );
}