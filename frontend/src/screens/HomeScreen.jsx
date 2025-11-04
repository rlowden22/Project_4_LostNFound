import React, { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Item from "../components/Item";
import items from "../items";
import "../styles/screens/HomeScreen.css";

const HomeScreen = () => {
  // Get 4 most recent items based on dateFound
  const recentItems = useMemo(() => {
    return [...items]
      .sort((a, b) => new Date(b.dateFound) - new Date(a.dateFound))
      .slice(0, 4);
  }, []);

  return (
    <div className="home-screen">
      <Container>
        <h1 className="home-title">Recent Lost Items</h1>
        <Row>
          {recentItems.map((item) => (
            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
              <Item item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;

