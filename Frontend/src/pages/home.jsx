import React from 'react'
import { useNavigate } from 'react-router-dom'
import bgimage from '../image/drive-download-20241217T033358Z-001/larm-rmah-AEaTUnvneik-unsplash.jpg'
import childimage from '../image/drive-download-20241217T033358Z-001/Blue_White_Professional_Concept_Foundation_Logo__2_-removebg-preview.png'
import yellow from '../image/drive-download-20241217T033358Z-001/Blue_White_Professional_Concept_Foundation_Logo-removebg-preview.png'
import { DollarSign, Heart, Users, ArrowRight, Star, Award, Globe } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  const handleDonateClick = () => {
    navigate('/donate')
  }

  const handleVolunteerClick = () => {
    navigate('/volunteer')
  }

  const handleFundraiseClick = () => {
    navigate('/donate/money')
  }

  return (
    <main className="relative bg-[#f5f5f3]">
      {/* Hero Section with background image */}
      <section className="relative">
        {/* Background image container */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bgimage} 
            alt="background" 
            className="w-full h-full object-cover opacity-30 blur-sm"
          />
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="space-y-8 relative">
              <div className="relative">
                <div className="absolute -left-12 -top-20 w-48 h-48 -rotate-45">
                  <img src={yellow} alt="" className="w-full h-full object-contain" />
                </div>
                <h1 className="relative text-6xl font-bold tracking-tight z-10">
                  DAAN
                </h1>
              </div>
              <h2 className="text-3xl font-medium">
                because we all are <br />
                <span className="italic">gifted.</span>
              </h2>
              <p className="text-gray-600 max-w-lg">
                Join us in making a difference. Every donation, every volunteer hour, and every act of kindness helps create a better world for those in need.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleDonateClick}
                  className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 flex items-center space-x-2"
                >
                  <Heart className="w-5 h-5" />
                  <span>Donate Now</span>
                </button>
                <button
                  onClick={handleVolunteerClick}
                  className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center space-x-2"
                >
                  <Users className="w-5 h-5" />
                  <span>Volunteer</span>
                </button>
              </div>
            </div>

            {/* Right column - Image */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                <img
                  src={childimage}
                  alt="Student portrait"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the content */}
      <div className="bg-[#f5f5f3]">
        {/* Welcome Section */}
        <section className="relative bg-white/80 backdrop-blur-sm py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute -left-4 -top-2 w-64 h-12 bg-gray-200 rounded-full opacity-50" />
                  <h2 className="relative text-[#2A9D8F] text-2xl font-medium">
                    Welcome to Daan
                  </h2>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold italic leading-tight">
                  We are world wide
                  <br />
                  charity organisation.
                </h1>
                <p className="text-gray-600 max-w-xl">
                  Our mission is to connect generous donors with those in need, creating a network of support that spans across communities and borders.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleDonateClick}
                    className="bg-[#2A9D8F] text-white px-6 py-3 rounded-lg hover:bg-[#238276] transition-colors flex items-center space-x-2"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column - Images */}
              <div className="relative">
                <div className="grid gap-8">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"
                      alt="Hands with red paint"
                      className="w-64 h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="relative bg-[#2A9D8F] p-6 rounded-lg w-64 ml-auto -mt-28">
                    <div className="text-white">
                      <span className="text-4xl font-bold">12+</span>
                      <p className="text-sm">years of<br />experience</p>
                    </div>
                  </div>
                  <div className="relative -mt-12">
                    <img
                      src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400"
                      alt="Children smiling"
                      className="w-3/4 h-48 object-cover rounded-lg shadow-lg ml-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="relative py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#F9EFDB] rounded-lg p-8 shadow-lg">
              {[
                { number: "25 K+", label: "Completed Project", icon: Star },
                { number: "12 M+", label: "Volunteer", icon: Users },
                { number: "15 M+", label: "Ideas raised funds", icon: DollarSign },
                { number: "5 K+", label: "Categories served", icon: Award },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 relative">
                  <div className="absolute inset-0 border border-dashed border-gray-300 m-2 rounded" />
                  <div className="relative">
                    <div className="flex justify-center mb-2">
                      <stat.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Causes Section */}
        <section className="relative py-16 bg-white/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="relative mb-8">
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-64 h-12 bg-gray-200 rounded-full opacity-50" />
              <h2 className="relative text-[#2A9D8F] text-2xl font-medium">
                Global Causes
              </h2>
            </div>
            <h3 className="text-4xl font-bold italic mb-8">
              Raise your hand to
              <br />
              global causes
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              From local community support to international relief efforts, we work tirelessly to address the most pressing needs around the world.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDonateClick}
                className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Globe className="w-5 h-5" />
                <span>Support Causes</span>
              </button>
            </div>
          </div>
        </section>
              
        <section className="relative py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Donation Card */}
              <div className="relative overflow-hidden rounded-lg group cursor-pointer" onClick={handleDonateClick}>
                <div className="absolute inset-0 bg-[#2A9D8F] opacity-90 group-hover:opacity-95 transition-opacity" />
                <div className="relative z-10 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">DONATION</h3>
                  <p className="mb-6 text-white/90">
                    Every contribution, no matter how small, makes a significant impact in someone's life. Your generosity creates ripples of positive change.
                  </p>
                  <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#2A9D8F] transition-colors flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Donate now</span>
                  </button>
                </div>
              </div>

              {/* Volunteer Card */}
              <div className="relative overflow-hidden rounded-lg group cursor-pointer" onClick={handleVolunteerClick}>
                <div className="absolute inset-0 bg-[#2A9D8F] opacity-90 group-hover:opacity-95 transition-opacity" />
                <div className="relative z-10 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">VOLUNTEER</h3>
                  <p className="mb-6 text-white/90">
                    Join our community of volunteers and make a difference with your time and skills. Every hour you give helps create a better world.
                  </p>
                  <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#2A9D8F] transition-colors flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Join Now</span>
                  </button>
                </div>
              </div>

              {/* Fundraise Card */}
              <div className="relative overflow-hidden rounded-lg group cursor-pointer" onClick={handleFundraiseClick}>
                <div className="absolute inset-0 bg-[#2A9D8F] opacity-90 group-hover:opacity-95 transition-opacity" />
                <div className="relative z-10 p-8 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-2xl font-bold">FUNDRAISE</h3>
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <p className="mb-6 text-white/90">
                    Start your own fundraising campaign and inspire others to join your cause. Together, we can achieve incredible things.
                  </p>
                  <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#2A9D8F] transition-colors flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Start Campaign</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Trusted Partners</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-600">DAAN</span>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-600">CharityLife</span>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-600">Global Aid</span>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-600">Mega Group</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-[#f5f5f3]">
          <div className="max-w-6xl mx-auto px-4">
            {/* Gallery Header */}
            <div className="text-center mb-12">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gray-200 blur-sm rounded-full" />
                <h2 className="relative text-[#2A9D8F] text-2xl font-medium px-12 py-2">
                  Gallery
                </h2>
              </div>
              <h3 className="text-4xl font-bold italic mt-6">
                some work of us
              </h3>
            </div>

            {/* Gallery Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden shadow-lg group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"
                  alt="Food distribution"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400"
                  alt="Children education"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400"
                  alt="Medical camp"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

