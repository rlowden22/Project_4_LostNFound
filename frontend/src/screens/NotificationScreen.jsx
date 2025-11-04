import React, { useState } from "react";
import { Container, Card, Badge, Button, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaTag, FaCalendarAlt, FaEye, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/screens/NotificationScreen.css";

const NotificationScreen = () => {
  // Sample notifications data (in real app, this would come from API)
  const [notifications, setNotifications] = useState([
    {
      _id: "1",
      itemId: "1",
      name: "Black Wallet",
      location: "Snell Library",
      image: "/images/wallet.jpg",
      category: "Accessories",
      dateFound: "2024-06-15",
      createdAt: "2024-06-15T10:30:00",
      read: false,
    },
    {
      _id: "2",
      itemId: "2",
      name: "Airpods",
      location: "Curry Student Center",
      image: "/images/airpods.jpg",
      category: "Electronics",
      dateFound: "2024-06-14",
      createdAt: "2024-06-14T15:45:00",
      read: false,
    },
    {
      _id: "3",
      itemId: "3",
      name: "Backpack",
      location: "Churchill Hall",
      image: "/images/backpack.jpg",
      category: "Bags",
      dateFound: "2024-06-13",
      createdAt: "2024-06-13T09:20:00",
      read: true,
    },
  ]);

  const markAsRead = (notificationId) => {
    setNotifications(
      notifications.map((notif) =>
        notif._id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(
      notifications.filter((notif) => notif._id !== notificationId)
    );
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="notification-screen">
      <Container>
        <div className="notification-header">
          <div className="header-content">
            <h1 className="notification-title">Notifications</h1>
            <p className="notification-subtitle">
              Stay updated with the latest lost items posted
            </p>
          </div>
          {unreadCount > 0 && (
            <div className="header-actions">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={markAllAsRead}
                className="mark-all-read-btn"
              >
                Mark all as read
              </Button>
              <Badge bg="primary" className="unread-badge">
                {unreadCount} new
              </Badge>
            </div>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card className="empty-notifications-card">
            <Card.Body className="text-center p-5">
              <h3>No Notifications</h3>
              <p className="text-muted">
                You're all caught up! No new notifications at the moment.
              </p>
            </Card.Body>
          </Card>
        ) : (
          <div className="notifications-list">
            {notifications.map((notification) => (
              <Card
                key={notification._id}
                className={`notification-card ${!notification.read ? "unread" : ""}`}
              >
                <Row className="g-0">
                  <Col xs={3} md={2} className="notification-image-col">
                    <div className="notification-image-wrapper">
                      <img
                        src={notification.image}
                        alt={notification.name}
                        className="notification-image"
                      />
                      {!notification.read && (
                        <div className="unread-indicator"></div>
                      )}
                    </div>
                  </Col>
                  <Col xs={9} md={10}>
                    <Card.Body className="p-3">
                      <div className="notification-content">
                        <div className="notification-main">
                          <h4 className="notification-item-name">
                            New Item: {notification.name}
                          </h4>
                          <div className="notification-details">
                            <span className="notification-detail-item">
                              <FaMapMarkerAlt className="detail-icon" />
                              {notification.location}
                            </span>
                            <span className="notification-detail-item">
                              <FaTag className="detail-icon" />
                              {notification.category}
                            </span>
                            <span className="notification-detail-item">
                              <FaCalendarAlt className="detail-icon" />
                              Found on{" "}
                              {new Date(
                                notification.dateFound
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <p className="notification-time">
                            {formatTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                        <div className="notification-actions">
                          <Link
                            to={`/item/${notification.itemId}`}
                            className="view-item-btn"
                            onClick={() => markAsRead(notification._id)}
                          >
                            <FaEye /> View Item
                          </Link>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="delete-notification-btn"
                            onClick={() =>
                              deleteNotification(notification._id)
                            }
                          >
                            <FaTimes />
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default NotificationScreen;

