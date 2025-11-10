import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Item from "../components/Item";
import "../styles/screens/HomeScreen.css";
import { API_BASE_URL } from "../config/api";

const HomeScreen = ({ apiBaseUrl = API_BASE_URL, fetchFn = fetch }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetchFn(
          `${apiBaseUrl}/api/items?status=searching&limit=4`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        let itemsArray = [];
        if (Array.isArray(data)) {
          itemsArray = data.filter((item) => item.status !== "claimed");
        } else if (data.items && Array.isArray(data.items)) {
          itemsArray = data.items;
        } else {
          itemsArray = [];
        }

        const recentItems = [...itemsArray]
          .sort((a, b) => new Date(b.dateFound) - new Date(a.dateFound))
          .slice(0, 4);
        setItems(recentItems);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [apiBaseUrl, fetchFn]);

  return (
    <div className="home-screen">
      <Container>
        <h1 className="home-title">Recent Lost Items</h1>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <div className="text-center py-5">
            <p>Error loading items: {error}</p>
          </div>
        ) : items.length > 0 ? (
          <Row>
            {items.map((item) => (
              <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                <Item item={item} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5">
            <p>No items found.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

HomeScreen.propTypes = {
  apiBaseUrl: PropTypes.string,
  fetchFn: PropTypes.func,
};

export default HomeScreen;
