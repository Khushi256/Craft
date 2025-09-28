import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[#3D6B73] text-white pb-10">
        <div>
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4 pt-10">Stay Connected</h2>
                <p className="mb-8">Subscribe to our newsletter for the latest updates and offers.</p>
            </div>
            <form className="max-w-md mx-auto">
                <div className="flex items-center border-b border-white py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Your email address" aria-label="Email"/>
                    <button className="flex-shrink-0 bg-white text-[#3D6B73] hover:bg-gray-200 py-2 px-4 rounded" type="submit">
                        Subscribe
                    </button>
                </div>
            </form>
            <div>
                <p className="text-center text-white mt-10">© 2024 Craft. All rights reserved.</p>
            </div>
        </div>
    </div>
  )
}

export default Footer
