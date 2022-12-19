import { useState } from "react";
import { useForm, ValidationError } from '@formspree/react';

const InquiryForm = () => {
    const [state, handleSubmit] = useForm("mayzwebg");

    if (state.succeeded) {
        return <p>{"Thank you for your submission. We will reach out soon."}</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="inquiry-form">
            <label htmlFor="email">Email</label>
            <input name="email" type="email" id="email" />
            <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
            />
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" />
            <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
            />
            <input type="submit" className="btn" disabled={state.submitting} />
        </form>
    )
}

export default InquiryForm;