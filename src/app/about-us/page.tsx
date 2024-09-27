import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Header from "../header";
import Image from "next/image";

const AboutUsPage = () => {
  return (
    <>
      <Header />
      <Card className="mx-2 md:mx-40 lg:mx-80 mt-20 md:px-10 sm:text-xl font-serif text-justify">
        <CardContent>
          <h1 className="text-5xl text-center">Artisan Nepal</h1>
          <div className="flex justify-center">
            <figure className="relative h-40 w-40">
              <Image src="/logo.svg" alt="Alember Shreesh" fill />
            </figure>
          </div>
          <p className="mt-4">
            <strong>Artisan Nepal</strong> is an innovative online marketplace
            designed to revolutionize the way homemade products and original
            artwork are bought and sold in Nepal. The platform leverages modern
            web technologies to provide artisans with a dedicated space to
            showcase and sell their creations, thereby enhancing visibility and
            fostering a supportive community for local talent. The primary goal
            of Artisan Nepal is to streamline marketing efforts and ensure
            secure transactions, thus empowering Nepalese artisans by providing
            them with direct access to a broader market. The platform not only
            allows for the easy listing and management of products but also
            offers features like customer reviews, order tracking, and sales
            analytics, which are crucial for the growth and sustainability of
            artisan businesses.
          </p>
          <p className="mt-4">
            Online Marketplace for Handmade Products represents a significant
            step forward in digitizing the traditional craft market,
            contributing to the cultural and economic growth of the country by
            supporting its local artisans and craftspeople. This platform is not
            just a marketplace but a movement to recognize and value the
            artistry inherent in Nepal&apos;s rich cultural heritage.
          </p>
          <p className="mt-4">
            Our primary objective is to develop a web application that provides
            a seamless and enjoyable experience for users looking to buy and
            sell homemade items. This platform will be user-friendly, ensuring
            that both sellers and buyers can easily navigate and utilize its
            features.
            <ol className="mt-4 list-decimal ml-5">
              <li>
                To create an intuitive and user-friendly platform for artisans
                to showcase and sell their products.
              </li>
              <li>
                To implement advanced filtering and recommendation algorithms to
                enhance product visibility and personalized user experience.
              </li>
              <li>
                To promote sustainable and eco-friendly products by encouraging
                local artisans and buyers to participate in a green marketplace.
              </li>
            </ol>
          </p>
          <h2 className="mt-4 text-2xl font-bold underline">
            Future Recommendation
          </h2>
          <p className="mt-2">
            <ul>
              <li>
                <strong>Advanced Recommendation System:</strong> Implementing an
                advanced recommendation engine using machine learning could
                personalize product suggestions for users, improving their
                shopping experience.
              </li>
              <li>
                <strong>Messaging System:</strong> Integrating a direct
                messaging system between buyers and sellers will allow real-time
                communication, improving the customer experience and fostering
                trust. This feature was not implemented in the current version
                due to time constraints.
              </li>
              <li>
                <strong>Online Payment Integration:</strong> Although eSewa was
                considered for future implementation, adding support for popular
                online payment methods such as credit cards, PayPal, and digital
                wallets will provide greater convenience for users.
              </li>
              <li>
                <strong>Enhanced Community Features:</strong> Adding features
                like forums, workshops, and live streaming events for artisans
                could foster deeper community engagement and promote their
                stories and products more effectively.
              </li>
            </ul>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default AboutUsPage;
