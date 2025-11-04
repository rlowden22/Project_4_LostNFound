import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col, Badge, Modal } from "react-bootstrap";
import { FaTrash, FaCheckCircle, FaSearch, FaEdit, FaLock, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/screens/ProfileScreen.css";

const ProfileScreen = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Sample user posts data (in real app, this would come from API)
  const [userPosts, setUserPosts] = useState([
    {
      _id: "1",
      name: "Black Wallet",
      location: "Snell Library",
      image: "/images/wallet.jpg",
      description: "A black leather wallet containing ID and credit cards.",
      dateFound: "2024-06-15",
      category: "Accessories",
      status: "searching", // "searching" or "claimed"
    },
    {
      _id: "2",
      name: "Airpods",
      location: "Curry Student Center",
      image: "/images/airpods.jpg",
      description: "White Apple Airpods found near the food court.",
      dateFound: "2024-06-14",
      category: "Electronics",
      status: "claimed",
    },
  ]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Change password:", passwordData);
    // Handle password change here
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordModal(false);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setUserPosts(userPosts.filter((post) => post._id !== postId));
    }
  };

  const handleStatusChange = (postId) => {
    setUserPosts(
      userPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              status: post.status === "searching" ? "claimed" : "searching",
            }
          : post
      )
    );
  };

  return (
    <div className="profile-screen">
      <Container>
        <div className="profile-header">
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your account and posts</p>
        </div>

        <Row>
          <Col lg={4} className="mb-4 mb-lg-0">
            <Card className="profile-card">
              <Card.Body className="p-4">
                <div className="profile-section">
                  <h3 className="section-title">
                    <FaLock className="section-icon" />
                    Change Password
                  </h3>
                  <p className="section-description">
                    Update your account password to keep your account secure
                  </p>
                  <Button
                    variant="primary"
                    className="change-password-btn"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Change Password
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="posts-card">
              <Card.Body className="p-4">
                <div className="posts-header">
                  <h3 className="section-title">My Recent Posts</h3>
                  <p className="section-description">
                    Manage your posted items and their status
                  </p>
                </div>

                {userPosts.length === 0 ? (
                  <div className="no-posts">
                    <p>You haven't posted any items yet.</p>
                    <Button variant="primary" href="/post">
                      Post Your First Item
                    </Button>
                  </div>
                ) : (
                  <div className="posts-list">
                    {userPosts.map((post) => (
                      <Card key={post._id} className="post-item-card mb-3">
                        <Row className="g-0">
                          <Col md={3} className="post-image-col">
                            <img
                              src={post.image}
                              alt={post.name}
                              className="post-item-image"
                            />
                          </Col>
                          <Col md={9}>
                            <Card.Body className="p-3">
                              <div className="post-item-header">
                                <div>
                                  <h4 className="post-item-name">{post.name}</h4>
                                  <Badge
                                    bg={
                                      post.status === "claimed"
                                        ? "success"
                                        : "warning"
                                    }
                                    className="status-badge"
                                  >
                                    {post.status === "claimed" ? (
                                      <>
                                        <FaCheckCircle /> Claimed
                                      </>
                                    ) : (
                                      <>
                                        <FaSearch /> Searching
                                      </>
                                    )}
                                  </Badge>
                                </div>
                                <div className="post-actions">
                                  <Button
                                    variant={
                                      post.status === "searching"
                                        ? "success"
                                        : "warning"
                                    }
                                    size="sm"
                                    className="status-btn"
                                    onClick={() => handleStatusChange(post._id)}
                                  >
                                    {post.status === "searching" ? (
                                      <>
                                        <FaCheckCircle /> Mark as Claimed
                                      </>
                                    ) : (
                                      <>
                                        <FaSearch /> Mark as Searching
                                      </>
                                    )}
                                  </Button>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    className="delete-btn"
                                    onClick={() => handleDeletePost(post._id)}
                                  >
                                    <FaTrash /> Delete
                                  </Button>
                                </div>
                              </div>
                              <div className="post-item-details">
                                <p className="post-item-location">
                                  <FaMapMarkerAlt /> {post.location}
                                </p>
                                <p className="post-item-category">
                                  Category: {post.category}
                                </p>
                                <p className="post-item-description">
                                  {post.description}
                                </p>
                                <p className="post-item-date">
                                  Found on:{" "}
                                  {new Date(post.dateFound).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </p>
                              </div>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Password Change Modal */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        centered
        className="password-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FaLock className="modal-icon" /> Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group className="mb-3" controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                required
              />
            </Form.Group>

            <div className="modal-actions">
              <Button
                variant="secondary"
                onClick={() => setShowPasswordModal(false)}
                className="cancel-modal-btn"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="submit-modal-btn">
                Change Password
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfileScreen;

