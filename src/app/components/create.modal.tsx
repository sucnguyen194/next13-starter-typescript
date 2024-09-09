'use client'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {toast} from "react-toastify";

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void
    addArticle: (value: any) => any,
}

function CreateModal(props: IProps) {
  const {showModalCreate, setShowModalCreate, addArticle} = props;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
        const response = await fetch("http://localhost:8000/blogs", {
          method: "POST",
          body: JSON.stringify({ title, author, content }),
          headers: {
              'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
            const newBlog = await response.json();
            addArticle(newBlog);
            handleCloseModal();

            toast.success('Blog added successfully!');
        } else {
            toast.error('Failed to add the blog');
        }
  }

  const handleCloseModal = () => {
      setTitle('');
      setAuthor('');
      setContent('');
      setShowModalCreate(false);
  }

  return (
    <>
      <Modal
        show={showModalCreate}
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
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="..."/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="..."/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" value={content} onChange={(e) => setContent(e.target.value)} rows={3}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
