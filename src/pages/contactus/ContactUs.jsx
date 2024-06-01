import React, { useState } from 'react'
import "./contactus.css"
import emailjs from "@emailjs/browser";
import sora from '../../../src/assets/images/contact.png'
const ContactUs = () => {
    const [form , setForm ] = useState({
    name : "",
    email : "",
    message : "",
    })
    const [loading , setLoading] = useState(false);

    const handleChange = (e) => {
    const { name , value } = e.target;
    setForm({...form , [name]:value })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true);
        emailjs.send(
        'service_3fck9er',
        'template_u5nrxjk',
        {
            from_name : form.name,
            to_name : 'Ibrahim',
            from_email : form.email,
            to_email : 'ebraheemzezo011@gmail.com',
            message : form.message,
        },
        'st06NduHZrq5VwrNL'
        ).then(()=>{
            setLoading(false)
            alert("Thank you. I will get back to you as soon as possible.")
            setForm({
            name : "",
            email : "",
            message : "",
            })
        },(error)=>{
            setLoading(false)
            console.log(error)
            alert('Somthing went wrong.')
        })
    }
    
  return (
    <>
        <div className='contact-us'>
            <div className='container'>
                <div className='img-and-contact'>
                    <div className='img-contact'>
                        <img src={sora} alt='photo' />
                    </div>
                    <div className='form-contact text-center '>
                        <h1 className='title-contact'>Contact Us</h1>
                        <p className='paragraph-text'>" We are very happy for you to leave us a message containing your 
                            suggestion or opinion so that we can always improve and develop our site. "</p>
                    <form onSubmit={handleSubmit} className='contact-us-form-all'>
                    <div className="contact-us-box" >
                        <input required className='contact-input' type="text" placeholder="name" name='name' value={form.name} onChange={handleChange} />
                    </div>
                    <div className="contact-us-box" >
                        <input className='contact-input' required type="email" placeholder="Email" name='email' value={form.email}  onChange={handleChange} />
                    </div>
                    <div className="contact-us-box" >
                        <textarea className=' contact-input contact-input-msg' rows={5} required type="text" placeholder="Message" name='message' value={form.message}  onChange={handleChange} />
                    </div>
                    <button className="default-button border px-5 py-2 border-0" variant="primary" type="submit">
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </form>
                    </div>
                </div>
            </div>
            </div>
    </>
  );
};

export default ContactUs ;