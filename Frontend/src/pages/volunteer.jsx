import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Calendar, MapPin, Users, Clock, CheckCircle } from 'lucide-react';

export default function Volunteer() {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventLocation: '',
    eventDescription: '',
    volunteerRole: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/signin');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/volunteer/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          eventName: '',
          eventDate: '',
          eventLocation: '',
          eventDescription: '',
          volunteerRole: ''
        });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error applying for volunteering:', error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingEvents = [
    {
      id: 1,
      name: "Food Distribution Drive",
      date: "2024-01-15",
      location: "Central Park, New York",
      description: "Help distribute food packages to families in need",
      roles: ["Food Packer", "Distribution Helper", "Coordinator"],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"
    },
    {
      id: 2,
      name: "Children's Education Camp",
      date: "2024-01-20",
      location: "Community Center, Brooklyn",
      description: "Teach basic skills to underprivileged children",
      roles: ["Teacher", "Activity Coordinator", "Support Staff"],
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400"
    },
    {
      id: 3,
      name: "Medical Health Camp",
      date: "2024-01-25",
      location: "City Hospital, Queens",
      description: "Provide basic health checkups and medical assistance",
      roles: ["Medical Assistant", "Registration Helper", "Coordinator"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Join Our Volunteer Team</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Make a difference in someone's life. Your time and skills can create lasting impact in our community.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <span>500+ Volunteers</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6" />
              <span>100+ Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Application Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Apply to Volunteer</h2>
            
            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                Application submitted successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  id="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter event name"
                  required
                />
              </div>

              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Location
                </label>
                <input
                  type="text"
                  id="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter event location"
                  required
                />
              </div>

              <div>
                <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description
                </label>
                <textarea
                  id="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe the event and what volunteers will be doing"
                  required
                />
              </div>

              <div>
                <label htmlFor="volunteerRole" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Role
                </label>
                <select
                  id="volunteerRole"
                  value={formData.volunteerRole}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="Coordinator">Event Coordinator</option>
                  <option value="Food Packer">Food Packer</option>
                  <option value="Distribution Helper">Distribution Helper</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Activity Coordinator">Activity Coordinator</option>
                  <option value="Support Staff">Support Staff</option>
                  <option value="Medical Assistant">Medical Assistant</option>
                  <option value="Registration Helper">Registration Helper</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Apply Now'}
              </button>
            </form>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
            
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-32 h-32 object-cover"
                  />
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {event.roles.map((role, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Volunteer Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Volunteer With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Impact</h3>
              <p className="text-gray-600">Make a real difference in people's lives and contribute to building stronger communities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personal Growth</h3>
              <p className="text-gray-600">Develop new skills, gain experience, and grow personally while helping others.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Commitment</h3>
              <p className="text-gray-600">Choose events that fit your schedule and interests. No long-term commitment required.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 