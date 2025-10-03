import { useState } from "react";
import {
  addToast,
  Card,
  CardBody,
  CardHeader,
  Form,
  Input,
  Button,
} from "@heroui/react";
import { Lock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore.js";
import NavBar from "../../components/Navbar.jsx";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword, error, isLoading } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);

      addToast({
        title: "Success",
        description:
          "Password reset successfully! Please log in with your new password.",
        color: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden flex-col">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-12"
        >
          <CardHeader title="Reset Password" className="flex gap-3 mb-4">
            <h1 className="text-3xl font-bold">Reset Password</h1>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                variant="bordered"
                startContent={<Lock />}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                variant="bordered"
                startContent={<Lock />}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isRequired
              />

              {error && <p className="text-danger font-semibold">{error}</p>}

              <Button type="submit" isLoading={isLoading}>
                Set New Password
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
