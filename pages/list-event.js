import { useState } from "react";
import Layout from "../components/Layout"
const ListEventPage = () => {
    const [isLoading, setLoading] = useState(true);

    return (
        <Layout>
            <h1 className='title'>List an Event</h1>
            {
                isLoading ? <p>Loading...</p>
                : 
                null
            }
            <iframe onLoad={() => setLoading(false)} className="airtable-embed" src="https://airtable.com/embed/shrh6JKDCdWSsEbDg?backgroundColor=grayLight" frameborder="0" onmousewheel="" width="100%" height="1800" style={{ background: "transparent", border: "1px solid #ccc" }}></iframe>
        </Layout>
    )
}

export default ListEventPage;