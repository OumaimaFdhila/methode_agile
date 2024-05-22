"use client"
import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "@/server actions/todoaction";
import { useToDos } from "./todosProvider";
const TodoList = () => {
  const {todos, update} = useToDos();

  const toast = useToast();

  const handleTodoDelete = async (id:string) => {
    if (confirm("Are you sure you wanna delete this todo?")) {
      await deleteTodo(id);
      update()
      toast({ title: "Todo deleted successfully", status: "success" });
    }
  };

  const handleToggle = async (id:string, status:string) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleTodoStatus({ docId: id, status: newStatus });
    update()
    toast({
      title: `Todo marked ${newStatus}`,
      status: newStatus == "completed" ? "success" : "warning",
    });
  };

  return (
    <Box mt={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {todos &&
          todos.map((todo) => (
            <Box
              key={todo.id}
              p={3}
              boxShadow="2xl"
              shadow={"dark-lg"}
              transition="0.2s"
              _hover={{ boxShadow: "sm" }}
            >
              <Heading as="h3" fontSize={"xl"}>
                {todo.title}{" "}
                <Badge
                  color="red.500"
                  bg="inherit"
                  transition={"0.2s"}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.2)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleTodoDelete(todo.id)}
                >
                  <FaTrash />
                </Badge>
                <Badge
                  color={todo.status == "pending" ? "gray.500" : "green.500"}
                  bg="inherit"
                  transition={"0.2s"}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.2)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleToggle(todo.id, todo.status)}
                >
                  
                  {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                </Badge>
                <Badge
                  float="right"
                  opacity="0.8"
                  bg={todo.status == "pending" ? "yellow.500" : "green.500"}
                >
                  {todo.status}
                </Badge>
              </Heading>
              <Text>{todo.description}</Text>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default TodoList;