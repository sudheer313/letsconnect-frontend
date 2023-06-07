import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import CreatePost from "./pages/CreatePost";
import UserProfile from "./pages/UserProfile";
import Search from "./pages/Search";
import PostView from "./pages/PostView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const httpLink = createHttpLink({
  uri: "https://letsconnect-backend.onrender.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts">
              <Route path="create" element={<CreatePost />} />
              <Route path=":postId" element={<PostView />} />
            </Route>
            <Route path="/users">
              <Route path=":userId" element={<UserProfile />} />
            </Route>
            <Route>
              <Route path="/search" element={<Search />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
