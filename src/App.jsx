import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Heading from './ui/Heading';
import Input from './ui/Input';
import Row from './ui/Row';

const StyledApp = styled.main`
  /* background-color: orangered; */
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row >

      
        <Row type="horizontal">
          <Heading as="h1">The wild Oasis</Heading>
          <div>
            <Heading  as="h2">Check in and Out</Heading>
            <Button onClick={() => alert('Check in')}>Check in</Button>
            <Button variation="secondary" size="small" onClick={() => alert('Check out')}>Check out</Button>
          </div> 
        </Row>
        <Row >
          <Heading as="h3">Forms</Heading>
          <div>
            <Input type="number" placeholder="Number of Guests" />
            <Input type="number" placeholder="Number of Guests" />
          </div>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
