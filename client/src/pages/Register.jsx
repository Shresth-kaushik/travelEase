import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('traveller');
  const [error, setError] = useState('');
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(name, email, password, role);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to create an account');
    }
  };

  return (
    <div>
      <Head>
        <title>TravelEase - Register</title>
        <meta name="description" content="Create a new TravelEase account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Register</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="traveller">Traveller</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link href="/login"><a className="text-purple-600 hover:underline">Log in here</a></Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}

