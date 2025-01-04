"use client";

import Footer from "@/app/component/footer";
import Navbar from "@/app/component/navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        {/* <header className="bg-primary text-white py-20">
          
        </header> */}

        <section className="relative h-[400px]">
          <div className="relative w-full h-[400px]">
            <Image
              src="/assets/showcase.jpeg"
              alt="showcase"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="text-center absolute inset-0 bg-black w-full bg-opacity-80 z-10 flex flex-col items-center justify-center h-full text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to Volunteer.ng</h1>
            <p className="text-lg mb-6">
              Empowering organizations and volunteers to create meaningful
              impact together.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="#features"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark"
              >
                Learn More
              </Link>
              <Link
                href="/login"
                className="bg-white text-primary px-6 py-2 rounded-lg hover:bg-gray-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              About Volunteer.ng
            </h2>
            <p className="text-center text-gray-700 max-w-3xl mx-auto">
              Volunteer.ng is an innovative platform connecting organizations
              with passionate volunteers to make a difference. Whether you're
              looking to manage projects or find opportunities to help, we’ve
              got you covered.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">For Organizations</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Manage projects efficiently.</li>
                  <li>Find and match with skilled volunteers.</li>
                  <li>Track and analyze project outcomes.</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">For Volunteers</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Explore meaningful opportunities.</li>
                  <li>Enhance your skills and gain experience.</li>
                  <li>Track your impact and contributions.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              Success Stories
            </h2>
            <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8">
              Hear how Volunteer.ng is changing lives and driving positive
              impact worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <blockquote className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <p className="italic text-gray-700">
                  "Volunteer.ng helped us find skilled volunteers quickly and
                  efficiently. Our projects have never run smoother!"
                </p>
                <cite className="block mt-4 text-sm text-gray-600">
                  – Organization A
                </cite>
              </blockquote>
              <blockquote className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <p className="italic text-gray-700">
                  "Through Volunteer.ng, I found projects that align with my
                  skills and passion. It’s been a truly rewarding experience."
                </p>
                <cite className="block mt-4 text-sm text-gray-600">
                  – Volunteer B
                </cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="mb-6">
              Join Volunteer.ng today and start creating change.
            </p>
            <Link
              href="/signup"
              className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark"
            >
              Get Started
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
