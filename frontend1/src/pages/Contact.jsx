import React from 'react'

import Lottie from 'lottie-react'
import contact from '../assets/orangeanime.json'
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


const Contact = () => {
   
  return (
    <section id='Contact' className='bg-white z-40 relative py-10 px-5 md:px-0'>
  <div className='mb-16 max-w-7xl mx-auto'>
    <div className='flex flex-col md:flex-row justify-between items-center'>
      <div className='md:w-1/2 mb-8 ml-2 md:mb-0'>
        <h2 className='text-3xl font-bold mb-3 text-orange-500'>Get in Touch</h2>
        <p className='mb-4 text-black'>I'm always open to new opportunities and collaboration. Feel free to reach out!</p>
        <div className='flex space-x-4'>
          <a href="#" className='text-gray-600 hover:text-gray-800'>
            <CiLinkedin className='w-8 h-8 text-blue-700'/></a>
          <a href="#" className='text-gray-600 hover:text-gray-800'>
            <FaInstagram className='w-8 h-8 text-pink-600' /></a>
          <a href="#" className='text-gray-600 hover:text-gray-800'>
            <CiFacebook className='w-8 h-8 text-blue-600' /></a>
          <a href="#" className='text-gray-600 hover:text-gray-800'>
            <FaGithub className='w-8 h-8 text-black' /></a>
        </div>
        <Lottie animationData={contact} className='w-[350px] h-[500px] relative bottom-10 -z-10 mx-auto lg:w-[500px]' />
      </div>
      <form className='w-full md:w-1/2 bg-gray-100 rounded-lg border border-blue-500 shadow-lg shadow-blue-500 p-10'>
        <h1 className='text-gray-900 text-4xl font-bold mb-7'>Contact Me</h1>
        <div className='mb-4'>
          <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name</label>
          <input type="text" id='name' placeholder='Full Name' className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'/>
        </div>
        <div className='mb-4'>
          <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
          <input type="email" id='email' placeholder='Email' className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'/>
        </div>
        <div className='mb-4'>
          <label htmlFor="message" className='block text-sm font-medium text-gray-700'>Message</label>
          <textarea id='message' placeholder='Enter Your Message' className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'/>
        </div>
        <button className='bg-blue-500 text-white px-3 py-2 rounded-lg'>Send Message</button>
      </form>
    </div>
  </div>
</section>
  )
}

export default Contact
