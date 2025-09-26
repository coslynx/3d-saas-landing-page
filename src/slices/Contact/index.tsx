import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

import Bounded from '../../components/ui/Bounded';
import TextSplitter from '../../components/ui/TextSplitter';
import Button from '../../components/ui/Button';

interface ContactProps {
  title: string;
  formEndpoint: string;
}

const Contact: React.FC<ContactProps> = ({ title, formEndpoint }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmissionResult(null);
    setSubmissionError(null);

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmissionResult('Thank you! Your message has been received.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const errorData = await response.json();
        setSubmissionError(`Submission failed: ${errorData.message || 'An unexpected error occurred.'}`);
        console.error('Form submission error:', errorData);
      }
    } catch (error: any) {
      setSubmissionError(`Submission failed: ${error.message || 'An unexpected error occurred.'}`);
      console.error('Form submission exception:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <Bounded>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            <TextSplitter text={title} splitBy="word" className="inline-block" />
          </h2>
          <p className="mt-4 text-gray-600">
            Reach out to us for any inquiries. We value your feedback.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.4 }}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="primary" size="large" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </Button>
          </div>

          {submissionResult && (
            <motion.div
              className="mt-6 text-green-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {submissionResult}
            </motion.div>
          )}

          {submissionError && (
            <motion.div
              className="mt-6 text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {submissionError}
            </motion.div>
          )}
        </motion.form>
      </Bounded>
    </section>
  );
};

export default Contact;