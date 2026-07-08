import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Users, 
  Heart, 
  Edit, 
  Trash2, 
  CheckCircle,
  XCircle,
  Clock,
  LogOut
} from 'lucide-react';

const Profile = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [donations, setDonations] = useState({});
  const [volunteering, setVolunteering] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    fetchUserData();
  }, [currentUser, navigate]);

  const fetchUserData = async () => {
    try {
      const [donationsRes, volunteeringRes] = await Promise.all([
        fetch('/api/donate/my-donations', { credentials: 'include' }),
        fetch('/api/volunteer/my-applications', { credentials: 'include' })
      ]);

      if (donationsRes.ok) {
        const donationsData = await donationsRes.json();
        setDonations(donationsData);
      }

      if (volunteeringRes.ok) {
        const volunteeringData = await volunteeringRes.json();
        setVolunteering(volunteeringData);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout', { credentials: 'include' });
      dispatch(signoutSuccess());
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (editForm.newPassword !== editForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      const updateData = {
        username: editForm.username,
        email: editForm.email
      };

      if (editForm.newPassword) {
        updateData.password = editForm.newPassword;
      }

      const res = await fetch(`/api/auth/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updateData)
      });

      if (res.ok) {
        setShowEditForm(false);
        setEditForm({
          username: editForm.username,
          email: editForm.email,
          password: '',
          newPassword: '',
          confirmPassword: ''
        });
        // Refresh user data
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteVolunteering = async (volunteerId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      try {
        const res = await fetch(`/api/volunteer/${volunteerId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (res.ok) {
          setVolunteering(volunteering.filter(v => v._id !== volunteerId));
        }
      } catch (error) {
        console.error('Error deleting volunteering application:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{currentUser?.username}</h1>
                <p className="text-gray-600">{currentUser?.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-8">
          <div className="flex border-b">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'donations', label: 'My Donations', icon: Heart },
              { id: 'volunteering', label: 'Volunteering', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                  <button
                    onClick={() => setShowEditForm(!showEditForm)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                {!showEditForm ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Username</p>
                          <p className="font-medium">{currentUser?.username}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{currentUser?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium">
                            {new Date(currentUser?.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          value={editForm.username}
                          onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={editForm.password}
                          onChange={(e) => setEditForm({...editForm, password: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={editForm.newPassword}
                          onChange={(e) => setEditForm({...editForm, newPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={editForm.confirmPassword}
                          onChange={(e) => setEditForm({...editForm, confirmPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Update Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEditForm(false)}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Donations Tab */}
            {activeTab === 'donations' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Donations</h2>
                {Object.keys(donations).length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No donations yet</p>
                    <button
                      onClick={() => navigate('/donate')}
                      className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Make Your First Donation
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(donations).map(([type, items]) => (
                      <div key={type} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 capitalize text-gray-800">{type} Donations</h3>
                        {items.length === 0 ? (
                          <p className="text-gray-500">No {type} donations yet.</p>
                        ) : (
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {items.map((item, idx) => (
                              <div key={item._id || idx} className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="space-y-2">
                                  {Object.entries(item).map(([key, value]) => (
                                    key !== '_id' && key !== '__v' && (
                                      <div key={key}>
                                        <span className="text-sm font-medium text-gray-600 capitalize">
                                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                                        </span>
                                        <span className="ml-2 text-gray-800">
                                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                                        </span>
                                      </div>
                                    )
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Volunteering Tab */}
            {activeTab === 'volunteering' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">My Volunteering Applications</h2>
                  <button
                    onClick={() => navigate('/volunteer')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Apply for New Event
                  </button>
                </div>
                
                {volunteering.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No volunteering applications yet</p>
                    <button
                      onClick={() => navigate('/volunteer')}
                      className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Apply for Volunteering
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {volunteering.map((volunteer) => (
                      <div key={volunteer._id} className="bg-white rounded-lg p-6 shadow-sm border">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className="text-xl font-semibold text-gray-800">{volunteer.eventName}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(volunteer.status)}`}>
                                {getStatusIcon(volunteer.status)}
                                <span className="capitalize">{volunteer.status}</span>
                              </span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">
                                  {new Date(volunteer.eventDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">{volunteer.eventLocation}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">{volunteer.volunteerRole}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">
                                  Applied on {new Date(volunteer.appliedAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 mt-3">{volunteer.eventDescription}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteVolunteering(volunteer._id)}
                            className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Withdraw Application"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 