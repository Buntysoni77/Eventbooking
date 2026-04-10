function Footer() {
  return (
    <div className="bg-black text-white px-10 py-10 mt-10">

      {/*  TOP SECTION */}
      <div className="grid grid-cols-3 gap-10">

        {/* ABOUT */}
        <div>
          <h2 className="text-xl font-bold mb-3">About BookMyEvent</h2>
          <p className="text-gray-400 text-sm leading-6">
            BookMyEvent is your one-stop destination for discovering and booking
            amazing events across India. From concerts and sports matches to
            tech conferences and festivals, we bring you the best experiences.
            Our platform uses smart recommendations to suggest events based on
            your interests, searches, and booking history.
          </p>
        </div>

        {/* HELP */}
        <div>
          <h2 className="text-xl font-bold mb-3">Support</h2>
          <p className="text-gray-400 text-sm mb-2">Help Center</p>
          <p className="text-gray-400 text-sm mb-2">Cancellation & Refund</p>
          <p className="text-gray-400 text-sm mb-2">Terms & Conditions</p>
          <p className="text-gray-400 text-sm">Privacy Policy</p>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-xl font-bold mb-3">Contact</h2>
          <p className="text-gray-400 text-sm mb-2">📧 support@bookmytrip.com</p>
          <p className="text-gray-400 text-sm mb-2">📞 +91 9876543210</p>
          <p className="text-gray-400 text-sm">📍 India</p>
        </div>
      </div>

      {/*  DIVIDER */}
      <div className="border-t border-gray-700 my-6"></div>
      {/* BOTTOM */}
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">
          © 2026 BookMyEvent. All rights reserved.
        </p>

        {/* SOCIAL */}
        <div className="flex gap-6 text-xl">
          <span>📸</span>
          <span>🐦</span>
          <span>💼</span>
          <span>📘</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;