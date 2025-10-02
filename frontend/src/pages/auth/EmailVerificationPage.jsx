import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  InputOtp,
  Form,
} from "@heroui/react";

import { useAuthStore } from "../../store/authStore.js";

const EmailVerificationPage = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await verifyEmail(code);
      navigate("/");
      addToast({
        title: "Success",
        description: "Email verified successfully!",
        color: "success"
      });
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-12 flex items-center justify-center">
        <CardHeader
          title="Email Verification"
          className="flex gap-3 mb-4 justify-center"
        >
          <h2 className="text-3xl font-bold text-center">Verify Your Email</h2>
        </CardHeader>
        <CardBody className="flex justify-center">
          <p className="text-center text-gray-300 mb-6">
            Enter the 6-digit code sent to your email address.
          </p>
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
          >
            <InputOtp
              value={code}
              onValueChange={setCode}
              length={6}
              variant={"bordered"}
              size="md"
            />
            {error && <p className="text-red-500 font-semibold">{error}</p>}
            <Button className="max-w-fit" type="submit" variant="flat" isLoading={isLoading}>
              Verify
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmailVerificationPage;
