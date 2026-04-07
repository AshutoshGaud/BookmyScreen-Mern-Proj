import React, { useEffect } from "react";
import Header from "../components/seat-layout/Header";
import Footer from "../components/seat-layout/Footer";
import { useParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getShowById } from "../apis";
import screenImg from "../assets/screen.png";
import { useSeatContext } from "../context/SeatContext";

/* 🎟️ Seat */
const Seat = ({ seat, row, selectedSeats, onClick }) => {
  const seatId = `${row}${seat.number}`;
  const isSelected = selectedSeats.includes(seatId);

  return (
    <button
      onClick={onClick}
      disabled={seat.status === "occupied"}
      className={`
        w-9 h-9 rounded-md text-xs font-medium border flex items-center justify-center
        transition-all duration-200
        ${
          seat.status === "occupied"
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : isSelected
            ? "bg-purple-600 text-white scale-105 shadow-md"
            : "bg-white border-gray-400 hover:bg-purple-100 hover:scale-105"
        }
      `}
    >
      {seat.status === "occupied" ? "×" : seat.number}
    </button>
  );
};

const SeatLayout = () => {
  const { showId } = useParams();
  const { selectedSeats, setSelectedSeats } = useSeatContext();

  /* 📡 Fetch Data */
  const { data: showData } = useQuery({
    queryKey: ["show", showId],
    queryFn: async () => await getShowById(showId),
    placeholderData: keepPreviousData,
    enabled: !!showId,
    select: (res) => res.data,
  });

  /* 🎯 Seat Select */
  const handleSelectSeat = (row, number) => {
    const seatId = `${row}${number}`;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  /* 🔄 Reset */
  useEffect(() => {
    setSelectedSeats([]);
  }, [showId]);

  /* 🧠 GROUP + SAFE SORT */
  const groupedSeats =
    showData?.seatLayout &&
    Object.entries(
      showData.seatLayout.reduce((acc, curr) => {
        const typeKey = curr.type?.toLowerCase().trim();

        if (!acc[typeKey]) {
          acc[typeKey] = {
            label: curr.type,
            price: curr.price,
            rows: [],
          };
        }

        acc[typeKey].rows.push(curr);
        return acc;
      }, {})
    ).sort(([a], [b]) => {
      const order = ["premium", "executive", "normal"];

      const indexA = order.indexOf(a);
      const indexB = order.indexOf(b);

      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

  return (
    <div className="h-screen flex flex-col bg-gray-50">

      {/* 🔝 HEADER */}
      <div className="fixed top-0 w-full z-10">
        <Header showData={showData} />
      </div>

      {/* 🎬 SEATS */}
      <div className="flex-1 mt-[180px] mb-[110px] overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center">

          {groupedSeats && (
            <div className="w-full">

              {groupedSeats.map(([type, { label, price, rows }]) => (
                <div key={type} className="mb-10">

                  {/* Section Title */}
                  <h2 className="text-center font-semibold text-gray-700 mb-4">
                    {label} - ₹{price}
                  </h2>

                  <div className="flex flex-col items-center gap-2">

                    {rows.map((rowObj) => (
                      <div
                        key={rowObj.row}
                        className="flex items-center justify-center gap-2"
                      >
                        {/* Row Label */}
                        <span className="w-6 text-xs text-gray-500 text-right">
                          {rowObj.row}
                        </span>

                        {/* Seats */}
                        <div className="flex gap-2">
                          {rowObj.seats?.map((seat, i) => (
                            <React.Fragment key={i}>

                              {/* 🎬 Middle Gap */}
                              {seat.number === 6 && <div className="w-4"></div>}

                              <Seat
                                seat={seat}
                                row={rowObj.row}
                                selectedSeats={selectedSeats}
                                onClick={() =>
                                  handleSelectSeat(rowObj.row, seat.number)
                                }
                              />
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              ))}

            </div>
          )}

          {/* 🎥 SCREEN */}
          <div className="mt-10 flex flex-col items-center">
            <img
              src={screenImg}
              alt="screen"
              className="w-[320px] opacity-90"
            />
            <p className="text-xs text-gray-500 mt-1">
              All eyes this way 👀
            </p>
          </div>
        </div>
      </div>

      {/* 🔻 FOOTER */}
      <div className="fixed bottom-0 w-full bg-white border-t p-3">
        <Footer selectedSeats={selectedSeats} />
      </div>

    </div>
  );
};

export default SeatLayout;