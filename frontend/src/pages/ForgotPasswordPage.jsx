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
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/authStore.js";
import NavBar from "../components/Navbar.jsx";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
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
          <CardHeader title="Forgot Password" className="flex gap-3 mb-4">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
          </CardHeader>
          {!isSubmitted ? (
            <CardBody>
              <p>
                Enter your email address and we'll send you a link to reset your
                password.{" "}
              </p>
              <Form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  variant="bordered"
                  startContent={<Mail />}
                  onChange={(e) => setEmail(e.target.value)}
                  isRequired
                />
                <Button type="submit" isLoading={isLoading}>
                  Send Reset Link
                </Button>
              </Form>
            </CardBody>
          ) : (
            <CardBody>
              <Mail className="h-8 w-8" />
              <p>
                If an account exists for {email}, you will receive a password
                reset link shortly.
              </p>
            </CardBody>
          )}
          <Divider />
          <CardFooter className="flex justify-center">
            <Link to="/login">
              <Button variant="link">Back to Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
