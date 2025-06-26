import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axiosInstance from '../utils/axios';
import * as Yup from 'yup';

const messageSchema = Yup.object().shape({
  message: Yup.string().min(15).max(500).required('message is required'),
  email: Yup.string().email('email must be a valid email').required('email is required'),
  name: Yup.string().min(3).max(30).required('name is required'),
})

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false)

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/gmail.send',
    flow: 'implicit',
    onSuccess: async tokenResponse => {
      setStatus('Google login successful! You may now send your message.');
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });
      const userInfo = await res.json();
      try {
        messageSchema.validateSync({ message: form.message, name: userInfo.name, email: userInfo.email });
      } catch (validationError) {
        setStatus(validationError.message || 'Validation failed.');
        setLoading(false);
        return;
      }

      if (!tokenResponse.access_token) {
        setStatus('Please sign in with Google before sending.');
        setLoading(false);
        return;
      }

      setStatus('Sending...');
      try {
        const res = await axiosInstance.post('/messages/send-client-email', {
          accessToken: tokenResponse.access_token,
          name: userInfo.name,
          email: userInfo.email,
          message: `${form.message}`,
        });
        if (res.ok || res.status === 200) setStatus('Message sent! Check your sent mail in Gmail.');
        else setStatus('Failed to send message.');
      } catch (error) {
        console.error('Error sending message:', error);
        setStatus('Error sending message.');
      }
      setLoading(false);
      setStatus('Message sent successfully.')
      setForm({ name: '', email: '', message: '' })
    },
    onError: () => setStatus('Google login failed.'),
  });


  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      if (form.message.trim().length < 15) {
        return setStatus('message must be at least 15 characters')
      }
      await login()
    } catch (loginError) {
      console.error('Google login error:', loginError);
      setStatus('Google login failed.');
      setLoading(false);
      return;
    }

  };

  return (
    <div className="bg-white text-gray-900 font-sans">
      <section className="relative text-white py-12 min-h-[55dvh] text-center bg-[url('/contact.png')] bg-cover bg-center">
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-3xl mx-auto px-0 mb-5" >
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-lg opacity-85">Contact us for inquiries or to discuss your project requirements with our team.</p>
        </div>
        <section className="max-w-5xl mx-auto px-0 py-8">
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="backdrop-blur-xs bg-black/50 rounded-xl shadow p-6 min-w-[200px] max-w-xs flex-1 text-center">
              <span className="text-3xl block mb-2">⏰</span>
              <h4 className="font-semibold mb-1">Working Hours</h4>
              <p className="text-sm">Sunday - Thursday: 9:00 AM - 6:00 PM<br />Friday & Saturday: Closed</p>
            </div>
            <div className="backdrop-blur-xs bg-black/50 rounded-xl shadow p-6 min-w-[200px] max-w-xs flex-1 text-center">
              <span className="text-3xl block mb-2">📍</span>
              <h4 className="font-semibold mb-1">Office</h4>
              <p className="text-sm">Business Central Towers, 14th Floor, Dubai Media City, Dubai, UAE</p>
            </div>
            <div className="backdrop-blur-xs bg-black/50 rounded-xl shadow p-6 min-w-[200px] max-w-xs flex-1 text-center">
              <span className="text-3xl block mb-2">✉️</span>
              <h4 className="font-semibold mb-1">Email</h4>
              <p className="text-sm">alaaahmad.freelance@gmail.com</p>
            </div>
            <div className="backdrop-blur-xs bg-black/50 rounded-xl shadow p-6 min-w-[200px] max-w-xs flex-1 text-center">
              <span className="text-3xl block mb-2">📞</span>
              <h4 className="font-semibold mb-1">Phone</h4>
              <p className="text-sm">+972 59 414 9120</p>
            </div>
          </div>
        </section>
      </section>

      <section className="max-w-5xl mx-auto px-0 py-12">
        <div className="flex flex-col md:flex-row gap-8 justify-between min-h-[340px] h-[360px]">
          <div className="md:w-1/2 flex flex-col h-full">
            <h3 className="font-bold text-lg mb-4">Find Us</h3>
            <div className="flex-1 flex flex-col">
              <div className="w-full bg-gray-50 rounded-lg p-6 shadow h-full flex flex-col justify-center">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=Gaza&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                className="rounded-lg border-0 shadow h-full min-h-[220px]"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col h-full">
            <h3 className="font-bold text-lg mb-4">Send Us a Message</h3>
            <form className="flex flex-col gap-4 bg-gray-50 rounded-lg p-6 shadow flex-1 justify-between h-full" onSubmit={handleSubmit}>
              <textarea
                name="message"
                placeholder="Your message"
                required
                rows={8}
                className="border border-gray-300 rounded-md px-4 py-2 min-h-[90px] resize-y focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={form.message}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-gradient-to-br from-[#0f0f26] to-[#02162D] text-white rounded-md py-2 mt-0 hover:bg-gray-800 transition"
                disabled={loading}
              >
                Send Message
              </button>
              <div className={`text-sm mt-2 ${status === 'Message sent successfully.' ? 'text-green-500' : 'text-red-500'}`}>
                {status}
              </div>            </form>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-1">Frequently Asked Questions</h2>
        <p className="text-gray-500 mb-12">Find answers to common questions about our business, services, and process.</p>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="backdrop-blur-xs bg-black/10 p-6 rounded-xl">
            <h3 className="font-bold mb-1">How long does a typical project take?</h3>
            <p className="text-gray-700 text-sm">Project timelines vary depending on the scope and complexity. A residential project may take 6-12 months from concept to completion, while larger commercial projects can take longer. We provide a more accurate timeline after our initial consultation.</p>
          </div>
          <div className="backdrop-blur-xs bg-black/10 p-6 rounded-xl">
            <h3 className="font-bold mb-1">What services do you offer?</h3>
            <p className="text-gray-700 text-sm">We offer architectural design, interior design, landscape design, project management, and sustainable solutions for both residential and commercial clients.</p>
          </div>
          <div className="backdrop-blur-xs bg-black/10 p-6 rounded-xl">
            <h3 className="font-bold mb-1">Do you work on international projects?</h3>
            <p className="text-gray-700 text-sm">Yes! We collaborate with clients and consultants worldwide, using digital tools to manage projects efficiently across different time zones and locations.</p>
          </div>
          <div className="backdrop-blur-xs bg-black/10 p-6 rounded-xl">
            <h3 className="font-bold mb-1">What is your design process?</h3>
            <p className="text-gray-700 text-sm">Our process starts with an in-depth consultation to understand your needs and vision. We then move through concept design, schematic design, and detailed documentation, keeping you involved at every step.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
