

import { HandCoins } from 'lucide-react'
import {Link} from "react-router-dom"

export default function MoneyDonationPage() {
  

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link 
        to="/donate"
        className="text-emerald-600 hover:text-emerald-700 inline-flex items-center mb-6"
      >
        ← Back to categories
      </Link>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <HandCoins className="w-8 h-8 text-emerald-600" />
          <h1 className="text-2xl font-bold">Donate Money</h1>
        </div>
        <form  className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="currency" className="block text-sm font-medium mb-2">Currency</label>
            <input
              type="text"
              id="currency"
              name="currency"
              
              placeholder="e.g., USD, EUR"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium mb-2">Payment Method</label>
            <input
              type="text"
              id="paymentMethod"
              name="paymentMethod"
              
              placeholder="e.g., Credit Card, PayPal"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              
              placeholder="Add a message with your donation"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Submit Donation
          </button>
        </form>
      </div>
    </div>
  )
}

