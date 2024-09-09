"use client";

import {useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';

const ViewDetail = ({params} : { params: { id: string }}) => {
    const [detail, setDetail] = useState('')
    const id = params?.id;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8000/blogs/${id}`);
            const data = await res.json();

            setDetail(data)
        }
        fetchData();
    }, [id])

    return(
        <>
            <Card style={{width: '100%', margin: '30px 0', textAlign: 'center'}}>
                 <Card.Header>{detail?.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {detail?.content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">{detail?.author}</Card.Footer>
            </Card>
        </>
    )
}

export default ViewDetail;
