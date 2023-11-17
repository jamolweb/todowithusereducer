import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  WrapItem,
  Text
} from "@chakra-ui/react";
import { useReducer, useEffect } from "react";

const LOCAL_STORAGE_KEY = "todosApp";

const App = () => {
  let reducer = (state, action) => {
    switch (action.type) {
      case 'newJob':
        return {
          ...state,
          newTodo: action.payload
        };
      case 'add':
        const updatedTodos = [...state.todos, { id: Date.now(), text: state.newTodo }];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ todos: updatedTodos, newTodo: state.newTodo }));
        return {
          ...state,
          todos: updatedTodos,
          newTodo: '',
        };
      case 'remove':
        const filteredTodos = state.todos.filter(todo => todo.id !== action.payload);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ todos: filteredTodos, newTodo: state.newTodo }));
        return {
          ...state,
          todos: filteredTodos,
        };
      default:
        return state;
    }
  };

  const [{ todos, newTodo }, dispatch] = useReducer(
    reducer,
    { todos: [], newTodo: '' },
    () => {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : { todos: [], newTodo: '' };
    }
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ todos, newTodo }));
  }, [todos, newTodo]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch({ type: 'add' });
    }
  };

  const removeTodo = (id) => {
    dispatch({ type: 'remove', payload: id });
  };

  const updateNewTodo = (value) => {
    dispatch({ type: 'newJob', payload: value });
  };

  return (
    <Box color={'red'} bg={'black'} w={'100%'} h={'100vh'}>
      <Container pt={'100'}>
        <Heading mb={'10px'} size={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }} textAlign={'center'}>
          Welcome to your todo list:
        </Heading>
        <Flex>
          <Input
            type="text"
            borderRadius={'10px 0 0 10px'}
            onChange={(e) => updateNewTodo(e.target.value)}
            placeholder="Enter a new todo"
            value={newTodo}
          />
          <Button borderRadius={'0 10px 10px 0'} onClick={addTodo}>
            + add
          </Button>
        </Flex>
      </Container>
      <Container mt={'10px'}>
        {todos.map((todo) => (
          <WrapItem
            border={'1px solid blue'}
            borderRadius={'10px'}
            alignItems={'center'}
            p={'5px 6px'}
            w={'100%'}
            justifyContent={'space-between'}
            mt={'4px'}
            key={todo.id}
          >
            <Text>{todo.text}</Text>
            <Button colorScheme="red" onClick={() => removeTodo(todo.id)}>
              remove
            </Button>
          </WrapItem>
        ))}
      </Container>
    </Box>
  );
};

export default App;