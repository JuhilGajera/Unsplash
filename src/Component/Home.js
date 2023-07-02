import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Gallery } from 'react-grid-gallery';


export default function Home() {
    const [index, setIndex] = useState(-1);
    const [images, setImages] = useState([]);

    const handleClick = (index, item) => setIndex(index);

    useEffect(() => {
        axios
            .get('https://api.unsplash.com/photos/random?count=10&client_id=S-dAcSRisi9VhS8L06dH1bqzPo74YLeUu7ydYEM8-H8')
            .then((res) => {
                const fetchedImages = res.data.map((item) => ({
                    src: item.urls.regular,
                    width: item.width,
                    height: item.height,
                }));
                setImages(fetchedImages);
                console.log('res===>>>', res);
            })
            .catch((err) => {
                console.log('err===>', err);
            });
    }, []);

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">GeekGallary</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto"></Nav>
                        <Form className="d-flex">
                            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                <Gallery images={images} onClick={handleClick} enableImageSelection={false} />
            </div>
        </>
    );
}
