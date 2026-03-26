import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Grid, Header, Icon } from "semantic-ui-react";
import "./Home.css";

const HomePage: FC = () => {
  return (
    <div className="home-page">
      <Container className="hero-section">
        <Header as="h1" className="hero-title">
          ✨ Danni's Content Hub ✨
        </Header>
        <p className="hero-subtitle">
          Track your favorite movies, shows, anime, and books all in one place
        </p>
      </Container>

      <Container className="features-section">
        <Grid centered stackable columns={2}>
          <Grid.Column>
            <Card className="feature-card">
              <Card.Content>
                <Icon name="film" size="huge" color="pink" />
                <Card.Header>Content Tracker</Card.Header>
                <Card.Description>
                  Browse and filter your favorite content by categories. See
                  what you watched in 2022 and 2023!
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  as={Link}
                  to="/watched"
                  primary
                  fluid
                  className="feature-button"
                >
                  View Content
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card className="feature-card">
              <Card.Content>
                <Icon name="coffee" size="huge" color="brown" />
                <Card.Header>Coffee Wheel</Card.Header>
                <Card.Description>
                  Can't decide what to order at the café? Let fate spin the
                  wheel and choose for you!
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  as={Link}
                  to="/coffee"
                  primary
                  fluid
                  className="feature-button"
                >
                  Spin Wheel
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>

      <Container className="about-section">
        <Header as="h2" textAlign="center">
          About This Site
        </Header>
        <p>
          Welcome to my personal content consumption tracker! This site helps me
          keep track of all the amazing movies, TV shows, anime, and books I've
          watched or read. It's a fun way to reflect on my entertainment
          journey and discover patterns in what I enjoy.
        </p>
        <p>
          Built with React, TypeScript, and Vite for a blazingly fast
          experience.
        </p>
      </Container>

      <Container className="categories-section">
        <Header as="h2" textAlign="center">
          Categories
        </Header>
        <div className="category-tags">
          <span className="category-tag">🎬 Movies</span>
          <span className="category-tag">📺 TV Shows</span>
          <span className="category-tag">🎨 Anime</span>
          <span className="category-tag">📖 Books</span>
          <span className="category-tag">⭐ Recommendations</span>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
