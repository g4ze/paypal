import { Field } from "../components/Field";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export function Signin() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen  ">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
        <nav className="pb-3">
            <div className="container mx-auto flex items-center justify-between">
                <Link className="text-4xl font-bold text-blue-500" to="/" style={{ textShadow: '2px 2px 4px rgba(10, 0, 0, 0.3)' }}>
                    Paypal
                </Link>
            </div>
        </nav>
          <form>
            
            <Heading label="Sign In" />
            <Field
              label="Username"
              type="text"
              placeholder="doe67"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Field
              label="Password"
              type="password"
              placeholder="********"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="flex items-center justify-between">
              <Button
                label={"Sign In"}
                type="button"
                onClick={async () => {
                  const response = await fetch(
                    "http://localhost:3000/api/v1/user/signin",
                    {
                      
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: username,
                        password: password,
                      }),
                    }
                  );
                  if (response.status === 200) {
                    console.log("User signed in successfully");
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    navigate("/dashboard");
                  } else {
                    alert("Invalid username or password");
                  }
                }}
              />
            </div>
          </form>
          <div className="text-center mt-4">
            <Link to="/signup" className="text-blue-500 hover:text-blue-700 transition duration-300">
              Don't have an account? Sign Up
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
}