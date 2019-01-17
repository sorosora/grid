import React from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider } from 'styled-components';
import { GridWrapper, Grid, Col, FullWidthWrapper } from './dist/grid.esm';

const Box = styled.div`
  height: 100px;
`;

function App() {
  return (
    <ThemeProvider theme={{
      grid: {
        padding: ['30px'],
        gridWidth: ['1000px'],
      },
    }}>
      <GridWrapper padding={['10px', '20px', '30px']} gridWidth={['1200px']}>
        <FullWidthWrapper enabled={[false, true, false]}>
          <Grid gutter={['10px', '16px', '12px']} verticalGutter={['20px']} showGrid={[12, 8, 4]} showCol>
            <Col width={[2 / 12, 2 / 8, 1 / 4]}>
              <Box />
            </Col>
            <Col width={[8 / 12, 4 / 8, 2 / 4]} offset={[1 / 12, 1 / 8 , 1 / 4]}>
              <Box />
            </Col>
            <Col width={[3 / 12]}>
              <Box />
            </Col>
            <Col width={[3 / 12]}>
              <Box />
            </Col>
            <Col width={[3 / 12]}>
              <Box />
            </Col>
          </Grid>
        </FullWidthWrapper>
      </GridWrapper>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
