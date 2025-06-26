"use client";

import Link from "next/link";
import HomeNavbar from "../component/home-page-navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";

const HomePage = () => {
  return (
    <>
      <HomeNavbar />

      <main className="font-sans">
        {/* Hero Section */}
        <section className="bg-green-50 pb-20 pt-40 text-center px-4">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Facilitating Social Impact
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
            Connect with meaningful volunteer opportunities that match your
            skills and passions. Join thousands making a difference across
            Nigeria.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/explore">
              <button className="bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition">
                Start Volunteering
              </button>
            </Link>

            <Link href="/explore">
              <button className="border border-green-600 text-green-600 px-4 py-3 rounded-md hover:bg-green-100 transition">
                Find Volunteers
              </button>
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-20 px-4 max-w-6xl mx-auto text-center"
        >
          <h2 className="text-3xl font-semibold text-green-700 mb-2">
            How Volunteer.NG Works
          </h2>
          <p className="text-gray-600 mb-10">
            Our platform makes it easy to find the perfect match between
            volunteers and organizations
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white shadow p-6 rounded-md">
              <h3 className="text-xl font-semibold mb-2">
                Create Your Profile
              </h3>
              <p className="text-gray-600">
                Sign up and showcase your skills, interests, and availability.
                Our smart matching system will connect you with the perfect
                opportunities.
              </p>
            </div>
            <div className="bg-white shadow p-6 rounded-md">
              <h3 className="text-xl font-semibold mb-2">
                Discover Opportunities
              </h3>
              <p className="text-gray-600">
                Browse hundreds of volunteer positions across Nigeria filtered
                by location, cause, skill requirements, and time commitment.
              </p>
            </div>
            <div className="bg-white shadow p-6 rounded-md">
              <h3 className="text-xl font-semibold mb-2">Track Your Impact</h3>
              <p className="text-gray-600">
                Monitor your volunteer hours, receive endorsements for your
                skills, and build a service portfolio that showcases your
                contribution.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section id="impact" className="bg-green-100 py-20 text-center px-4">
          <h2 className="text-3xl font-semibold text-green-700 mb-2">
            The Impact We&apos;re Making Together
          </h2>
          <p className="text-gray-700 mb-10">
            Join a growing movement of Nigerians committed to national
            development through service
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-800">1,000+</h3>
              <p className="text-gray-700">Active Volunteers</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-800">500+</h3>
              <p className="text-gray-700">Organizations</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-800">₦10M+</h3>
              <p className="text-gray-700">Service Value Generated</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="py-20 px-4 max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl font-semibold text-green-700 mb-2">
            Stories of Transformation
          </h2>
          <p className="text-gray-600 mb-10">
            Hear from volunteers and organizations who&apos;ve experienced the
            power of connection
          </p>
          <div className="text-left">
            <Carousel
              autoPlay
              centerMode
              infiniteLoop
              showThumbs={false}
              showArrows={false}
              showIndicators={false}
              showStatus={false}
              useKeyboardArrows={true}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white shadow p-6 rounded-md mx-5 h-64 flex flex-col items-center justify-between"
                >
                  <p className="text-gray-700 italic">
                    <q>{testimonial.content}</q>
                  </p>

                  <div>
                    <h3 className="mt-4 font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Sign-up Section */}
        <section id="join" className="bg-green-50 py-20 px-4 text-center">
          <h2 className="text-3xl font-semibold text-green-700 mb-2">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-700 mb-10">
            Get your free account in less than 2 minutes and start making a
            difference
          </p>
          <form className="max-w-2xl mx-auto grid gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                width={150}
                height={50}
              />
            </Link>

            <Link
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width={150}
                height={50}
              />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-green-700 text-white text-center py-6 px-4">
          <p>© 2025 Volunteer.ng - Building Nigeria Through Service</p>
          <div className="mt-2 text-sm flex flex-wrap justify-center gap-4">
            <span>By Volint</span>
            <span>Secure & Private</span>
            <span>Made in Nigeria 🇳🇬</span>
          </div>
        </footer>
      </main>
    </>
  );
};

export default HomePage;
