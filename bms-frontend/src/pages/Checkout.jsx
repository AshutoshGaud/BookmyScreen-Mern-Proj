import React from "react";
import Header from "../components/seat-layout/Header";
import dayjs from "dayjs";
import { FaInfoCircle } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { CiCircleQuestion, CiUser } from "react-icons/ci";

const Checkout = () => {

  const shows = {
    _id: "show123",
    date: "12-10-2025",
    startTime: "07:30 PM",
    movie: {
      title: "Interstellar",
      certification: "UA13+",
      languages: ["English", "Hindi"],
      format: ["2D", "IMAX"],
      posterUrl:
        "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    },
    theatre: {
      name: "PVR Icon",
      city: "Mumbai",
      state: "Maharashtra",
    },
  };

  const selectedSeats = [
    { type: "PREMIUM", seatNumber: "B5", price: 510 },
    { type: "PREMIUM", seatNumber: "B6", price: 510 },
  ];

  const user = {
    name: "Ashutosh Gaud",
    phone: "8652547528",
    email: "ashutoshgaud9945@gmail.com",
  };

  /* GROUP SEATS */
  const groupSeatsByType = (seats) => {
    const grouped = {};
    seats.forEach((seat) => {
      if (!grouped[seat.type]) grouped[seat.type] = [];
      grouped[seat.type].push(seat.seatNumber);
    });

    return Object.entries(grouped).map(([type, seats]) => ({
      type,
      seats,
    }));
  };

  /* PRICE CALCULATION */
  const calculateTotalPrice = (seats) => {
    const base = seats.reduce((acc, seat) => acc + seat.price, 0);
    const tax = Math.round(base * 0.18);
    const total = base + tax;
    return { base, tax, total };
  };

  const { base, tax, total } = calculateTotalPrice(selectedSeats);

  return (
    <div className="min-h-screen w-full bg-white">

      <Header type="checkout" showData={shows} />

      <div className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* Movie Details */}
          <div className="flex gap-4 items-start">
            <img
              src={shows.movie.posterUrl}
              alt={shows.movie.title}
              className="w-[60px] h-[90px] rounded object-cover"
            />

            <div>
              <h3 className="font-semibold text-lg">
                {shows.movie.title}
              </h3>

              <p className="text-sm text-gray-600">
                {shows.movie.certification} |{" "}
                {shows.movie.languages.join(", ")} |{" "}
                {shows.movie.format.join(", ")}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {shows.date} | {shows.startTime}
              </p>

              <p className="text-sm text-gray-600">
                {shows.theatre.name}, {shows.theatre.city},{" "}
                {shows.theatre.state}
              </p>
            </div>
          </div>

          {/* Show Details */}
          <div className="border rounded-[24px] px-6 py-5">

            <p className="border-b pb-4">
              {
                dayjs(shows.date, "DD-MM-YYYY")
                  .format("D MMM YYYY")
              } • {shows.startTime}
            </p>

            <div className="flex justify-between mt-4">
              <p>{selectedSeats.length} Tickets</p>

              <div className="text-right">
                {groupSeatsByType(selectedSeats).map(({ type, seats }) => (
                  <p key={type}>
                    {type} - {seats.join(", ")}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t pt-3">
              <p>Base: ₹{base}</p>
              <p>GST: ₹{tax}</p>
              <p className="font-semibold mt-2">Total: ₹{total}</p>
            </div>
          </div>

          {/* Cancellation */}
          <div className="border rounded-[24px] px-5 py-5 text-yellow-800">
            <p className="flex items-center gap-2">
              <FaInfoCircle /> No cancellation after payment
            </p>
          </div>

          {/* Offers */}
          <div className="flex justify-between border rounded-[24px] px-6 py-5">
            <p className="flex items-center gap-2">
              <BiSolidOffer /> Offers
            </p>
            <p className="text-blue-600 cursor-pointer">
              View offers
            </p>
          </div>

        </div>

        {/* RIGHT SECTION */}
<div className="space-y-6">

  {/* 🔥 Payment Summary Title OUTSIDE */}
  <h4 className="font-semibold text-lg">Payment Summary</h4>

  {/* Payment Box */}
  <div className="border rounded-[24px] px-6 py-5">

    <div className="flex justify-between">
      <span>Order Amount</span>
      <span>₹{base}</span>
    </div>

    <div className="flex justify-between mt-2">
      <span>GST</span>
      <span>₹{tax}</span>
    </div>

    <div className="flex justify-between font-semibold border-t mt-3 pt-3">
      <span>Total</span>
      <span>₹{total}</span>
    </div>

  </div>

  {/* 🔥 Your Details Title */}
  <h4 className="font-semibold text-lg">Your Details</h4>

  {/* User Details Box */}
  <div className="border rounded-[24px] px-6 py-5 flex gap-3">
    <CiUser size={24} />
    <div>
      <p className="font-medium">{user.name}</p>
      <p className="text-sm text-gray-600">+91 {user.phone}</p>
      <p className="text-sm text-gray-600">{user.email}</p>
    </div>
  </div>

  {/* Terms */}
  <div className="border rounded-[24px] px-6 py-5 cursor-pointer">
    <p className="flex items-center gap-2">
      <CiCircleQuestion /> Terms & Conditions
    </p>
        </div>
        <div className="flex justify-between items-center bg-black rounded-[24px] px-6 py-4 cursor-pointer">
            <p className="text-white font-bold">
                ₹1204 <span className="text-xs font-medium">TOTAL</span>
            </p>
            <p className="text-white font-medium">Proceed to Pay</p>
        </div>
        </div>
        </div>
      </div>
  );
};

export default Checkout;