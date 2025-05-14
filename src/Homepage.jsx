import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavBar from "./NavBar";

function Homepage() {
  const navigate = useNavigate();

  const handleGoingOutClick = () => {
    navigate("/main"); 
  };

  const handleComingInClick = () => {
    navigate("/itemark"); 
  };

  return (
    <>
      <NavBar />

      <div className="form-container">
        <div className="form-col">
          <div className="form-title">What is today's activity</div>
          <div className="btn-box">
            <div className="relative">
              <Button
                onClick={handleGoingOutClick}
                className="fixed top-20 right-10 left-10 mt-30"
                variant="outline"
              >
                Going Out
              </Button>
              <Button
                onClick={handleComingInClick}
                className="fixed top-30 right-10 left-10 mt-40 mb-5"
                variant="outline"
              >
                Coming In
              </Button>
              <Button
                onClick={handleGoingOutClick}
                className="fixed top-40 right-10 left-10 mt-50"
                variant="outline"
              >
                SleepOver
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
