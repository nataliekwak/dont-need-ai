import { Button, Form, Input } from "@heroui/react";

// This is the content for step one
// where the user is asked to enter their prompt

const StepOne = () => {
  return (
    <div>
      <p>What are you writing about?</p>
      <p>Enter your prompt, question, or idea.</p>
      <Form>
        <Input />
        <Button type="submit">Next</Button>
      </Form>
    </div>
  )
};

export default StepOne;
