import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button"
import Input from "./ui/Input";
import Heading from "./ui/Heading";


const StyledApp = styled.main`
background-color: orangered;
padding: 20px;
`;

 
function App() {
  return (
    <>
      <GlobalStyles/>
    <StyledApp>
      <Heading as="h1">The wild Oasis</Heading>
      <Heading as="h2">Check in and Out</Heading>
      <Button onClick={()=>alert("Check in")}>Check in</Button>
      <Button onClick={() => alert("Check out")}>Check out</Button>
      
      <Input type="number" placeholder="Number of Guests"/>
      <Heading as="h3">Forms</Heading>
      <Button onClick={()=>alert("Check in")}>Check in</Button>
      <Button onClick={() => alert("Check out")}>Check out</Button>
      
      <Input type="number" placeholder="Number of Guests"/>
      </StyledApp>
      </>
  ) 
}


export default App;