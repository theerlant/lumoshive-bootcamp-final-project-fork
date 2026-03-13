import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../../../components/BreadCrumbs";
import { Button } from "../../../components/Button";
import { priceFormatter } from "../../../../shared/utils/priceFormatter";
import useSWR from "swr";
import shoppingCartService from "../../../../shared/services/shoppingCartService";
import { productService } from "../../../../shared/services/productService";
import { toast } from "react-toastify";
import { Edit2Icon } from "lucide-react";
import { dateFormatter } from "../../../../shared/utils/dateFormatter";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressService } from "../../../../shared/services/addressService";
import { promotionService } from "../../../../shared/services/promotionService";
import { orderService } from "../../../../shared/services/orderService";
import { checkoutSchema } from "../../../../shared/schema/checkoutSchema";

const CheckoutProductImage = ({ productId, alt }) => {
  const { data } = useSWR(`/products/${productId}`, () =>
    productService.public.getById(productId),
  );

  return (
    <div className="w-14 h-14 shrink-0 bg-[#f5f5f5] flex items-center justify-center rounded-sm overflow-hidden">
      {data?.images?.[0] ? (
        <img
          src={`http://103.150.116.241:8082${data.images[0].image_url}`}
          alt={alt}
          className="w-full h-full object-contain p-2"
        />
      ) : (
        <span className="text-xs text-gray-400">img</span>
      )}
    </div>
  );
};

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [appliedPromo, setAppliedPromo] = useState(null);

  useEffect(() => {
    const savedPromo = sessionStorage.getItem("appliedPromoCode");
    if (savedPromo) {
      promotionService.public
        .getByCode(savedPromo)
        .then((res) => {
          setAppliedPromo(res.data || res);
        })
        .catch(() => {
          sessionStorage.removeItem("appliedPromoCode");
        });
    }
  }, []);

  const { data: cartResponse, isLoading } = useSWR(
    "/cart",
    shoppingCartService.get,
  );

  const { data: addressResponse } = useSWR("/address", addressService.getAll);

  const cartData = cartResponse || {
    items: [],
    subtotal: 0,
    total_items: 0,
    total_quantity: 0,
  };

  const addresses = addressResponse?.data || addressResponse || [];
  const defaultAddress = addresses.find((a) => a.is_default) || addresses[0];

  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      address_id: "",
      payment_method: "bank_transfer",
      notes: "",
    },
  });

  // Autofill address when loaded
  if (defaultAddress && !watch("address_id")) {
    setValue("address_id", defaultAddress.id);
  }

  // Calculate discount and total
  const cartSubtotal = cartData.subtotal;
  let discountAmount = 0;
  if (appliedPromo) {
    const minPurchase = parseFloat(appliedPromo.min_purchase || "0");
    if (cartSubtotal >= minPurchase) {
      if (appliedPromo.discount_type === "percentage") {
        discountAmount =
          (cartSubtotal * parseFloat(appliedPromo.discount_value)) / 100;
        if (appliedPromo.max_discount) {
          const maxD = parseFloat(appliedPromo.max_discount);
          if (discountAmount > maxD) discountAmount = maxD;
        }
      } else {
        discountAmount = parseFloat(appliedPromo.discount_value);
      }
    }
  }
  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  const onSubmit = async (data) => {
    try {
      if (!data.address_id) {
        toast.error("Please ensure you have a shipping address.");
        return;
      }
      const savedPromo = sessionStorage.getItem("appliedPromoCode");
      const orderResponse = await orderService.public.create(
        data.address_id,
        data.payment_method,
        savedPromo || undefined,
        data.notes || undefined,
      );
      toast.success("Order placed successfully!");
      sessionStorage.removeItem("appliedPromoCode");
      const order = orderResponse?.data || orderResponse;
      navigate(`/order-success/${order.id || order.order_number}`, {
        state: { orderData: order },
      });
    } catch (err) {
      toast.error(
        `Failed to place order: ${err.response?.data?.message || err.message}`,
      );
    }
  };

  if (isLoading && !cartResponse) {
    return (
      <div className="w-full pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout" },
          ]}
        />
        <div className="flex flex-col gap-10 mt-10">
          <div className="text-center py-20 font-medium text-gray-500">
            Loading checkout...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />
      <h1 className="text-4xl font-medium mt-10 mb-10">Billing Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-[100px]">
        {/* Left Column - Billing Form */}
        <div className="flex flex-col gap-8">
          {/* Address */}
          <div>
            <h3 className="text-[#DB4444] font-medium text-lg mb-4">
              Your Address
            </h3>
            {defaultAddress ? (
              <div className="bg-[#f5f5f5] p-6 rounded-sm flex justify-between items-start">
                <div>
                  <p className="font-medium text-black">
                    {defaultAddress.recipient_name} |{" "}
                    {defaultAddress.phone || "081234567890"}
                  </p>
                  <p className="text-black/60 mt-1">
                    {defaultAddress.full_address}
                  </p>
                </div>
                <Link
                  to={`/me/address/${defaultAddress.id}`}
                  className="text-black hover:text-[#DB4444] transition-colors"
                >
                  <Edit2Icon size={20} />
                </Link>
              </div>
            ) : (
              <div className="bg-[#f5f5f5] p-6 rounded-sm">
                <p className="text-black/50">You don't have an address yet.</p>
                <Link
                  to="/account/address"
                  className="text-[#DB4444] hover:underline mt-2 inline-block"
                >
                  Add an address
                </Link>
              </div>
            )}
          </div>

          {/* Shipping */}
          <div>
            <h3 className="text-[#DB4444] font-medium text-lg mb-4">
              Your Shipping
            </h3>
            <div className="bg-[#f5f5f5] p-6 rounded-sm">
              <p className="font-medium text-black">Regular Shipping</p>
              <p className="text-black/50 text-sm mt-1">
                Get voucher if your order doesn't arrive by{" "}
                {dateFormatter(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000))}.
              </p>
            </div>
          </div>

          {/* Note */}
          <div>
            <h3 className="text-[#DB4444] font-medium text-lg mb-4">
              Your Note
            </h3>
            <textarea
              {...register("notes")}
              maxLength={100}
              placeholder="Message for Sellers"
              className="w-full rounded-sm border border-black/30 p-4 h-[100px] outline-none focus:border-[#DB4444] transition-colors"
            />
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {cartData.items?.map((item) => (
              <div
                key={item.cart_item_id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <CheckoutProductImage
                    productId={item.product_id}
                    alt={item.product_name}
                  />
                  <span className="font-medium line-clamp-1 max-w-[200px]">
                    {item.product_name}
                  </span>
                </div>
                <span className="font-medium">
                  {priceFormatter(item.subtotal)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex justify-between border-b border-black/30 pb-4">
              <span className="font-medium">Subtotal:</span>
              <span className="font-medium">
                {priceFormatter(cartSubtotal)}
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between border-b border-black/30 pb-4 text-[#DB4444]">
                <span className="font-medium">
                  Discount ({appliedPromo.name}):
                </span>
                <span className="font-medium">
                  -{priceFormatter(discountAmount)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-b border-black/30 pb-4">
              <span className="font-medium">Shipping:</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="font-medium text-lg">Total:</span>
              <span className="font-medium text-lg">
                {priceFormatter(finalTotal)}
              </span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col gap-4 mt-4">
            <label className="flex justify-between items-center cursor-pointer group">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  value="bank_transfer"
                  {...register("payment_method")}
                  className="w-5 h-5 accent-black cursor-pointer"
                />
                <span className="font-medium">Bank</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 overflow-hidden">
                  <img src="/bkash.png" className="w-10 h-8 object-contain" />
                  <img src="/visa.png" className="w-10 h-8 object-contain" />
                  <img
                    src="/mastercard.png"
                    className="w-10 h-8 object-contain"
                  />
                  <img src="/nagad.png" className="w-10 h-8 object-contain" />
                </div>
              </div>
            </label>

            <label className="flex items-center gap-4 cursor-pointer group mt-2">
              <input
                type="radio"
                value="cod"
                {...register("payment_method")}
                className="w-5 h-5 accent-black cursor-pointer border-black"
                style={{ accentColor: "black" }}
              />
              <span className="font-medium">Cash on delivery</span>
            </label>
          </div>

          <Button onClick={handleSubmit(onSubmit)}>Place Order</Button>
        </div>
      </div>
    </div>
  );
};
