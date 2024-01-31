import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingCard from "../components/ListingCard";

export default function Home() {
  SwiperCore.use([Navigation]);
  const [offerListing, setOfferListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);

  useState(() => {
    const fetchOfferListings = async () => {
      try {
        const response = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await response.json();
        setOfferListing(data);
        fetchRentListings();
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const response = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await response.json();
        setRentListing(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const response = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await response.json();
        setSaleListing(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <p className="text-slate-700 text-3xl lg:text-6xl font-bold">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </p>
        <div>
          <p className="text-gray-500 text-xs sm:text-sm">
            realEstate will help you find your home fast, easy and comfortable.
            <br />
            Our expert support are always available.
          </p>
        </div>
        <Link
          to={"/search"}
          className="text-blue-500 font-semibold hover:underline"
        >
          Let's Start now...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide>
              <div
                className="h-[700px]"
                key={listing._id}
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing results for offer, sale and rent */}
      <div className="flex flex-col max-w p-3 gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <p className="text-2xl font-semibold text-slate-600">
                Recent offers
              </p>
              <Link
                to={"/search?offer=true"}
                className="text-sm text-blue-500 font-semibold hover:underline "
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListing && rentListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <p className="text-2xl font-semibold text-slate-600">
                Recent places for rents
              </p>
              <Link
                to={"/search?type=rent"}
                className="text-sm text-blue-500 font-semibold hover:underline "
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListing && saleListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <p className="text-2xl font-semibold text-slate-600">
                Recent places for sales
              </p>
              <Link
                to={"/search?type=sale"}
                className="text-sm text-blue-500 font-semibold hover:underline "
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
