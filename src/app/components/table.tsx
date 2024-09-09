'use client'
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/cjs/Button";
import UpdateModal from "./update.modal";
import CreateModal from "./create.modal";
import {useEffect, useState} from "react";
import Link from "next/link";
import {toast} from "react-toastify";

interface Props {
    articles: ArticleD[];
    addArticle: any
}

const AppTable = (props: Props) => {
    const {articles, addArticle} = props;
    const [article, setArticle] = useState(null);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);


    const handleDelete = async (id: number) => {
        if (confirm('Chắc muốn xoá không?') === true) {
            const response = await fetch(`http://localhost:8000/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (response.ok) {

                toast.success('Blog deleted successfully!');
            } else {
                toast.error('Failed to add the blog');
            }
        }
    }

    return (
        <>
            <div className='mb-3 mt-3' style={{display: 'flex', justifyContent: 'space-between'}}>
                <h3>Table Articles</h3>
                <Button variant='secondary' onClick={() => setShowModalCreate(true)}>Add new</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {articles?.map(item => {
                    return (
                        <tr key={item?.id}>
                            <td>{item?.id}</td>
                            <td>{item?.title}</td>
                            <td>{item?.author}</td>
                            <td>
                                <Link href={`/blogs/${item?.id}`} className='btn btn-primary'>view</Link>
                                <Button variant='warning' className='mx-3'
                                        onClick={() => {
                                            setShowModalUpdate(true)
                                            setArticle(item)
                                        }}
                                >Edit</Button>
                                <Button variant='danger' onClick={() => handleDelete(item?.id)}>Delete</Button>
                            </td>
                        </tr>
                    )
                })}

                </tbody>
            </Table>
            <CreateModal showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate} addArticle={addArticle}/>
            <UpdateModal showModalUpdate={showModalUpdate} setShowModalUpdate={setShowModalUpdate} article={article} setArticle={setArticle}/>
        </>
    );
}

export default AppTable;
