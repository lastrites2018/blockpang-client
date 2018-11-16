import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Header, Button, Segment } from "semantic-ui-react";

class Login extends Component {
  render() {
    return (
      <Container>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Header as="h1">Login/Signup Page</Header>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  We Help Companies and Companions
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  We can give your company superpowers to do things that they
                  never thought possible. Let us delight your customers and
                  empower your needs... through pure data analytics.
                </p>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  We Make Bananas That Can Dance
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Yes that's right, you thought it was the stuff of dreams, but
                  even bananas can be bioengineered.
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button as={Link} to="/" size="huge">
                  Check Them Out
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default Login;