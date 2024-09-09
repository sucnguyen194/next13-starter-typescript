'use client'

import AppTable from "../components/table";
import {useEffect, useState} from "react";

const Blog = () => {
    const [articles, setArticles] = useState(null);

    const addArticle = (article) => {
        setArticles((prevArticles) => [article, ...prevArticles]);
    };
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:8000/blogs");
            const data = await res.json();

            setArticles(data);
        }
        fetchData();
    }, [])

    if(!articles) {
        return(
            <div>Loading...</div>
        )
    }

    return (
        <>
            <AppTable articles={articles?.sort((a: any, b: any) => b.id - a.id )} addArticle={addArticle}/>
        </>
    )
}

export default Blog;
