import { useState, useEffect } from "react";
import Store from "./Store";

export default function Welcome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);

  if (loading) {
    return (
      <div style={{
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        background:"#000",
        color:"#fff"
      }}>
        <img src="/logo.png" width="160" />
        <h1>MGS Golf Noodles</h1>
        <p>Loading store...</p>
      </div>
    );
  }

  return <Store />;
}