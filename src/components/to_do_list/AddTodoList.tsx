"use client"
import React from "react";
import {
  Box,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { addTodo } from "@/app/api/toDoList/route";
const AddTodo = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("pending");
  const [isLoading, setIsLoading] = React.useState(false);
  const {data:session}=useSession()

  const toast = useToast();



  const handleTodoCreate = async () => {
    setIsLoading(true);
    const todo = {
      title,
      description,
      status,
      userId: session?.user.id,
    };
    await addTodo(todo);
    setIsLoading(false);

    setTitle("");
    setDescription("");
    setStatus("pending");

    toast({ title: "Todo created successfully", status: "success" });
  };

  return (
    <Box w="40%" margin={"0 auto"} display="block" mt={5}>
      <Stack direction="column">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option
            value={"pending"}
            style={{ color: "yellow", fontWeight: "bold" }}
          >
            Pending ⌛
          </option>
          <option
            value={"completed"}
            style={{ color: "green", fontWeight: "bold" }}
          >
            Completed ✅
          </option>
        </Select>

        <Button
          onClick={() => handleTodoCreate()}
          disabled={title.length < 1 || description.length < 1 || isLoading}
          variantColor="teal"
          variant="solid"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddTodo;