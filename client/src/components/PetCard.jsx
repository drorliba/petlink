import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Stack } from 'react-bootstrap';
import HeartButton from './HeartButton';
import '../css/PetCard.css';

const PetCard = ({ petObject }) => {
    const navigate = useNavigate();

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={petObject.picture} />
            <Card.Body>
                <Card.Title>
                    <Stack direction="horizontal" gap={2}>
                        <>{petObject.name}</>
                        {(petObject.adoptionStatus === 'fostered') && <Badge pill bg="secondary">fostered</Badge>}
                        {(petObject.adoptionStatus === 'adopted') && <Badge pill bg="secondary">adopted</Badge>}
                    </Stack>
                </Card.Title>

                <Card.Text as={'div'}>
                    <Button variant="outline-success" size="sm" onClick={e => navigate(`/pet/${petObject.petId}`)}>See more</Button>
                    <HeartButton petId={petObject.petId} />
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default PetCard;