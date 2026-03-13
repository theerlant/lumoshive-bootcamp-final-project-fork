import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  SendHorizonalIcon,
  TwitterIcon,
} from "lucide-react";
import appQr from "@/assets/app_qr.png";
import playStoreLogo from "@/assets/play_store_button.png";
import appStoreLogo from "@/assets/app_store_button.png";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <>
      {/* Desktop Layout */}
      <footer className="hidden lg:grid bg-black px-18 xl:px-24 pt-14 xl:pt-16 pb-8 grid-cols-5 gap-12 xl:gap-16  text-white">
        <EmailSubscribeSection />
        <SupportSection />
        <AccountSection />
        <QuickLinkSection />
        <div>
          <h2 className="text-xl font-medium mb-6">Download App</h2>
          <div className="flex flex-col gap-4">
            <p className="text-[#FAFAFA]/70 text-xs">
              Save $3 with App New User Only
            </p>
            <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr] justify-items-center xl:justify-items-normal gap-2">
              <img
                src={appQr}
                className="w-[70%] xl:w-19 aspect-square row-span-2 "
              />
              <img src={playStoreLogo} className="w-[90%] xl:w-auto" />
              <img src={appStoreLogo} className="w-[90%] xl:w-auto" />
            </div>
            <SocialMediaSection />
          </div>
        </div>
        <Copyright />
      </footer>
      {/* Mobile Layout */}
      <footer className="flex flex-col lg:hidden bg-black px-8 pt-10 pb-8 gap-4 text-white">
        <div className="flex w-full gap-8 md:gap-12 [&>*:first-child]:flex-1 mb-4">
          <EmailSubscribeSection />
          <SocialMediaSection />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <QuickLinkSection />
          <SupportSection />
          <AccountSection />
          <div>
            <h2 className="text-xl font-medium mb-6">Download App</h2>
            <div className="flex flex-col gap-4">
              <p className="text-[#FAFAFA]/70 text-xs">
                Save $3 with App New User Only
              </p>
              <div className="grid grid-cols-[auto_1fr] gap-2">
                <img src={appQr} className="w-19 aspect-square row-span-2 " />
                <img src={playStoreLogo} />
                <img src={appStoreLogo} />
              </div>
            </div>
          </div>
        </div>
        <Copyright />
      </footer>
    </>
  );
};

const EmailSubscribeSection = () => {
  return (
    <div>
      <div className="mb-4">
        <Logo />
      </div>
      <h2 className="text-xl font-medium mb-6">Subscribe</h2>
      <p className="mb-4">Get 10% off your first order</p>
      <div className="flex justify-between items-center border-[1.5px] rounded-sm px-3 py-3">
        <input
          className="outline-0 w-[75%]"
          name="email"
          id="email"
          placeholder="Enter your email"
        />
        <button className="hover:cursor-pointer">
          <SendHorizonalIcon />
        </button>
      </div>
    </div>
  );
};

const SocialMediaSection = () => {
  return (
    <div className="flex flex-col justify-between lg:flex-row gap-4 mt-4 *:stroke-2">
      <FacebookIcon />
      <TwitterIcon />
      <InstagramIcon />
      <LinkedinIcon />
    </div>
  );
};

const SupportSection = () => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Support</h2>
      <p className="mb-4">Jl. Gatot Subroto Jakarta, 12930, Indonesia.</p>
      <p className="mb-4">exclusive@gmail.com</p>
      <p className="mb-4">+62815-8888-9999</p>
    </div>
  );
};

const QuickLinkSection = () => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Quick Link</h2>
      <div className="flex flex-col gap-4">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms">Terms of Use</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

const AccountSection = () => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Account</h2>
      <div className="flex flex-col gap-4">
        <Link to="/me">My Account</Link>
        <span className="flex gap-1">
          <Link to="/auth">Login </Link>/
          <Link to="/auth/register">Register</Link>
        </span>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/">Shop</Link>
      </div>
    </div>
  );
};

const Copyright = () => {
  return (
    <div className="col-span-full opacity-50 text-center">
      © Copyright Lumoshive. All right reserved
    </div>
  );
};
