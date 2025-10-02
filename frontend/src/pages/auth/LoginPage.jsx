import { useState } from "react";
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
import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/authStore.js";
import NavBar from "../components/Navbar.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-12"
        >
          <CardHeader title="Login" className="flex gap-3 mb-4">
            <h1 className="text-3xl font-bold">Login</h1>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleLogin}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                variant="bordered"
                startContent={<Mail />}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                variant="bordered"
                startContent={<Lock />}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex items-center mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              {error && <p className="text-red-500 font-semibold">{error}</p>}

              <Button type="submit" isLoading={isLoading}>
                Login
              </Button>
            </Form>
          </CardBody>
          <Divider />
          <CardFooter className="text-sm text-center">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
