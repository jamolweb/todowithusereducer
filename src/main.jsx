import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoApp from './App'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <TodoApp />
  </ChakraProvider>,
)