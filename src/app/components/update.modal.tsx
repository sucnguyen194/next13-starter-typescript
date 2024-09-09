'use client'

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {mutate} from "swr";

interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    article: any;
    setArticle: any
}

const UpdateModal = (props: IProps) => {
    const {showModalUpdate, setShowModalUpdate, article, setArticle} = props;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [id, setId] = useState(0);

    const handleCloseModal = () => {
        setShowModalUpdate(false);
        setArticle(null)
    }

    useEffect(() => {
        if (article && article.id) {
            setTitle(article?.title);
            setAuthor(article?.author);
            setContent(article?.content);
            setId(article?.id);
        }

    }, [article])


    const handleUpdate = async () => {
        const response = await fetch(`http://localhost:8000/blogs/${id}`, {
          method: "PUT",
          body: JSON.stringify({ title, author, content }),
          headers: {
              'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
            const newBlog = await response.json();

            handleCloseModal();
            mutate('http://localhost:8000/blogs');
            toast.warning('Blog updated successfully!');
        } else {
            toast.error('Failed to add the blog');
        }
  }

    return (
        <Modal
            show={showModalUpdate}
            onHide={() => handleCloseModal()}
            backdrop="static"
            keyboard={false}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                                      placeholder="..."/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                                      placeholder="..."/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" value={content} onChange={(e) => setContent(e.target.value)}
                                      rows={3}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseModal()}>
                    Close
                </Button>
                <Button variant="warning" onClick={() => handleUpdate()}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateModal;
