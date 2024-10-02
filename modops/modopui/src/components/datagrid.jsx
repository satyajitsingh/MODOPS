import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './App.css'; // Import custom CSS file

const ModDataApp = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/download_csv/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setRows(json);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="table-title">Current Defence Opportunities</h1>
      <Accordion defaultActiveKey="0">
        {rows.map((row, index) => (
          <Card key={index}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
                Project: {row['Project Title']}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index.toString()}>
              <Card.Body>
                <Accordion defaultActiveKey="0">
                  {/* Project Details Tab */}
                  <Card className="project-details-tab">
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Project Details
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div><strong>Project Code:</strong> {row['Notice Identifier']}</div>
                        <div><strong>Project Title:</strong> {row['Title']}</div>
                        <div><strong>Project Description:</strong> {row['Description']}</div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  {/* Opportunity Details Tab */}
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Opportunity Details
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <div><strong>Notice Type:</strong> {row['Notice Type']}</div>
                        <div><strong>Additional Text:</strong> {row['Additional Text']}</div>
                        <div><strong>Contract Start Date:</strong> {row['Start Date']}</div>
                        <div><strong>Contract End Date:</strong> {row['Closing Date']}</div>
                        <div><strong>Region:</strong> {row['Region']}</div>
                        <div><strong>Cpv Codes:</strong> {row['Cpv Codes']}</div>
                        <div><strong>Value Low:</strong> {row['Value Low']}</div>
                        <div><strong>Value High:</strong> {row['Value High']}</div>
                        <div><strong>Suitable for SME:</strong> {row['Suitable for SME']}</div>
                        <div><strong>Suitable for VCO:</strong> {row['Suitable for VCO']}</div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  {/* Buyer Details Tab */}
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        Buyer Details
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        <div><strong>Contact:</strong> {row['Contact Name']}</div>
                        <div><strong>Email:</strong> {row['Contact Email']}</div>
                        <div><strong>Contact Address 1:</strong> {row['Contact Address 1']}</div>
                        <div><strong>Contact Address 2:</strong> {row['Contact Address 2']}</div>
                        <div><strong>Contact Town:</strong> {row['Contact Town']}</div>
                        <div><strong>Contact Postcode:</strong> {row['Contact Postcode']}</div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  );
};

export default ModDataApp;
