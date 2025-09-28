import React, { useState } from "react";
import { Modal, Button, Badge, Card, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bell, Star, User, Settings, LogOut, CheckCircle, MessageCircle } from "lucide-react";

const mockRequests = [
  { id: 1, user: "John Doe", service: "Medical Consultation", urgency: "High", description: "Need immediate medical advice", timestamp: "2 hours ago", status: "pending" },
  { id: 2, user: "Sarah Smith", service: "Technical Support", urgency: "Medium", description: "Computer not starting", timestamp: "4 hours ago", status: "pending" },
  { id: 3, user: "Mike Johnson", service: "Home Repair", urgency: "Low", description: "Leaky faucet in kitchen", timestamp: "1 day ago", status: "pending" },
];

const mockRatings = [
  { id: 1, user: "Alice Brown", rating: 5, comment: "Excellent service!", date: "2024-01-15" },
  { id: 2, user: "Bob Wilson", rating: 4, comment: "Good assistance.", date: "2024-01-14" },
  { id: 3, user: "Carol Davis", rating: 5, comment: "Highly recommend!", date: "2024-01-13" },
];

const mockProfile = {
  name: "Assistant Name",
  email: "assistant@careconnect.com",
  specialization: "Medical & Technical Support",
  experience: "5 years",
  rating: 4.8,
  completedRequests: 247,
};

export default function AssistantDashboard() {
  const [requests, setRequests] = useState(mockRequests);
  const [profile, setProfile] = useState(mockProfile);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleShowRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  }

  const averageRating = (mockRatings.reduce((sum, r) => sum + r.rating, 0) / mockRatings.length).toFixed(1);

  return (
    <Container fluid className="bg-light min-vh-100 pt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white shadow-sm sticky-top">
        <div className="d-flex align-items-center">
          <div className="bg-white text-dark rounded-circle d-flex justify-content-center align-items-center me-2" style={{ width: '50px', height: '50px' }}>
            CC
          </div>
          <h4>CareConnect - Assistant Dashboard</h4>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-light"><Bell /></Button>
          <Button variant="outline-light"><LogOut /></Button>
        </div>
      </div>

      {/* Overview Cards */}
      <Row className="mt-4 g-3">
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Pending Requests <Bell /></Card.Title>
              <h2 className="text-primary">{requests.filter(r => r.status === 'pending').length}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Average Rating <Star /></Card.Title>
              <h2 className="text-warning">{averageRating}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Completed Requests <CheckCircle /></Card.Title>
              <h2 className="text-success">{profile.completedRequests}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Grid */}
      <Row className="mt-4 g-3">
        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Header>Pending Assistance Requests <Bell /></Card.Header>
            <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {requests.filter(r => r.status === 'pending').map(req => (
                <Card key={req.id} className="mb-2 p-2 bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{req.user}</strong>
                      <div className="text-primary">{req.service}</div>
                    </div>
                    <Badge bg={req.urgency === 'High' ? 'danger' : req.urgency === 'Medium' ? 'primary' : 'secondary'}>
                      {req.urgency}
                    </Badge>
                  </div>
                  <p className="small mt-1">{req.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{req.timestamp}</small>
                    <div className="d-flex gap-2">
                      <Button size="sm" onClick={() => handleShowRequest(req)}>Review</Button>
                      <Button size="sm" variant="outline-secondary"><MessageCircle /></Button>
                    </div>
                  </div>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Header>Recent Ratings & Reviews <Star /></Card.Header>
            <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {mockRatings.map(r => (
                <Card key={r.id} className="mb-2 p-2 bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{r.user}</strong>
                    <div>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={i < r.rating ? "text-warning" : "text-secondary"} size={16} />
                      ))}
                    </div>
                  </div>
                  <p className="small mt-1">{r.comment}</p>
                  <small className="text-muted">{r.date}</small>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Profile Card */}
      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div><User /> Profile Information</div>
              <Button variant="primary"><Settings /> Update Profile</Button>
            </Card.Header>
            <Card.Body className="d-flex gap-4">
              <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px', fontSize: '24px' }}>
                {profile.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h5>{profile.name}</h5>
                <p className="text-primary">{profile.email}</p>
                <p>Specialization: {profile.specialization}</p>
                <p>Experience: {profile.experience}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Request Modal */}
      <Modal show={showRequestModal} onHide={() => setShowRequestModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <p><strong>User:</strong> {selectedRequest.user}</p>
              <p><strong>Service:</strong> {selectedRequest.service}</p>
              <p><strong>Urgency:</strong> {selectedRequest.urgency}</p>
              <p><strong>Description:</strong> {selectedRequest.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowRequestModal(false)}>Accept</Button>
          <Button variant="danger" onClick={() => setShowRequestModal(false)}>Reject</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
