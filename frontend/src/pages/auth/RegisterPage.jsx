import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Form,
  Input,
  Button,
} from "@heroui/react";
import { Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import { useAuthStore } from "../store/authStore.js";
import NavBar from "../components/Navbar.jsx";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useAuthStore();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await signup(name, email, password);
      navigate("/verify-email");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-12"
        >
          <CardHeader title="Register" className="flex gap-3 mb-4">
            <h1 className="text-3xl font-bold">Register</h1>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleRegister}>
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                variant="bordered"
                startContent={<User />}
                onChange={(e) => setName(e.target.value)}
                isRequired
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                variant="bordered"
                startContent={<Mail />}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                variant="bordered"
                startContent={<Lock />}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
              />
              {error && <p className="text-red-500 font-semibold">{error}</p>}
              <PasswordStrengthMeter password={password} />
              <Button type="submit" isLoading={isLoading}>
                Register
              </Button>
            </Form>
          </CardBody>
          <Divider />
          <CardFooter className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default RegisterPage;
