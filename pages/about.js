import Layout from "../components/Layout";
import InquiryForm from "../components/InquiryForm";

const AboutPage = () => {
    return (
        <Layout>
            <h1 className='title'>About</h1>
            <p>Around the Block is the place to find out about blockchain meetups, conferences, hackathonns, and event near you.</p>

            <h2 className="title">Reach Out to Us</h2>
            <InquiryForm />
        </Layout>
    )
}

export default AboutPage;