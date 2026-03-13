import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, CheckCircle } from "lucide-react";
import { Modal } from "../../../../admin/components/Modal";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../../../shared/schema/contactSchema";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

export default function ContactUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data); // Can remove this, just for simulating send
    toast.success("Success! Your message has been sent.");
    setIsModalOpen(true);
    reset();
  };

  return (
    <div>
      {/* {Home/Contact} */}
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sisi Kiri */}
        <div className="w-full lg:w-1/3 shadow-lg rounded-md p-8 space-y-8 border border-gray-50">
          {/* call to us */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#DB4444] p-3 rounded-full text-white">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-lg">Call To Us</h3>
            </div>
            <p className="text-sm">We are available 24/7, 7 days a week.</p>
            <p className="text-sm">Phone: +8801611112222</p>
          </div>

          <hr className="border-gray-300" />

          {/* write to us */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#DB4444] p-3 rounded-full text-white">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-lg">Write To Us</h3>
            </div>
            <p className="text-sm text-balance leading-relaxed">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-sm">Emails: customer@exclusive.com</p>
            <p className="text-sm">Emails: support@exclusive.com</p>
          </div>
        </div>

        {/* Sisi Kanan */}
        <div className="w-full lg:w-2/3 shadow-lg rounded-md p-8 border border-gray-50">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name *"
                  className={`w-full bg-gray-100 p-3 rounded-md focus:outline-[#DB4444] ${errors.name ? "border-red-500 border" : ""}`}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email *"
                  className={`w-full bg-gray-100 p-3 rounded-md focus:outline-[#DB4444] ${errors.email ? "border-red-500 border" : ""}`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Your Phone *"
                  className={`w-full bg-gray-100 p-3 rounded-md focus:outline-[#DB4444] ${errors.phone ? "border-red-500 border" : ""}`}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <textarea
                rows="8"
                placeholder="Your Message"
                className={`w-full bg-gray-100 p-3 rounded-md focus:outline-[#DB4444] resize-none ${errors.message ? "border-red-500 border" : ""}`}
                {...register("message")}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#DB4444] text-white px-10 py-4 rounded-md hover:bg-[#c13e3e] transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center text-center space-y-4">
          <CheckCircle
            size={80}
            className="text-emerald-500"
            strokeWidth={1.5}
          />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">Success!</h2>
            <p className="text-gray-500">
              Your message has been sent successfully
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 bg-[#DB4444] text-white px-8 py-2 rounded-lg font-medium hover:bg-[#c13e3e] transition-all"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
