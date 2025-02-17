import { useLocation } from "react-router-dom";
import { Typography } from "@/components/shared/Typography";
import { Button } from "@/components/shared/Button";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Użytkownik próbował uzyskać dostęp do nieistniejącej strony:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <Typography variant="h1" className="mb-4">404</Typography>
        <Typography variant="body" className="mb-4">Ups! Strona nie została znaleziona</Typography>
        <Button variant="ghost" onClick={() => window.location.href = "/"}>
          Powrót do strony głównej
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
