import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

function LoadingExample() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // Simulate a time-consuming process
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Button onClick={handleClick} disabled={loading}>
        Start Process
      </Button>
      {loading && <Spinner animation="border" role="status" />}
    </div>
  );
}

export default LoadingExample;
