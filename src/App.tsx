import React, {useEffect, useState} from 'react';
import './App.css';
import {Col, Container, Row} from "reactstrap";
import firebase from './initializer/firebase';
import {firestore} from 'firebase';

interface Bid {
  bid: number;
  created_at: firestore.Timestamp
  name: string,
}

const App: React.FC = () => {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    async function getFirebaseDocs() {
      const db = firebase.firestore();
      const snapshot = await db.collection('bids').get();
      setBids(snapshot.docs.map(doc => doc.data()) as Bid[])
    }

    getFirebaseDocs();
  });

  return (
    <Container>
      <Row>
        <Col sm="12" md={{size: 6, offset: 3}}>
          <h1>OUHNDY'S 1080 AUKTION</h1>

          {bids.sort((a, b) => b.bid - a.bid).map((bid: Bid) => (
            <Row key={bid.bid}>
              <Col>
                <h3>{bid.name}</h3>
              </Col>
              <Col className={"text-right"}>
                <h3>{(bid.bid / 100).toFixed(2)} CHF</h3>
                <p>{bid.created_at.toDate().toLocaleDateString('de-CH')} {bid.created_at.toDate().toLocaleTimeString('de-CH', {
                  hour: "numeric",
                  minute: "numeric"
                })}</p>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
