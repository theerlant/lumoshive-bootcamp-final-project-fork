import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { Breadcrumbs } from "../../../components/BreadCrumbs";
import { Button } from "../../../components/Button";
import { priceFormatter } from "../../../../shared/utils/priceFormatter";
import useSWR from "swr";
import shoppingCartService from "../../../../shared/services/shoppingCartService";
import { productService } from "../../../../shared/services/productService";
import { toast } from "react-toastify";
import { promotionService } from "../../../../shared/services/promotionService";

const CartProductImage = ({ productId, alt }) => {
  const { data } = useSWR(`/products/${productId}`, () =>
    productService.public.getById(productId),
  );

  return (
    <div className="w-full h-full bg-[#f5f5f5] flex items-center justify-center rounded-sm overflow-hidden">
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

export const MyCartPage = () => {
  const navigate = useNavigate();
  const [promoCodeInput, setPromoCodeInput] = useState(
    sessionStorage.getItem("appliedPromoCode") || "",
  );
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
          setPromoCodeInput("");
        });
    }
  }, []);

  const {
    data: cartData,
    mutate,
    isLoading,
  } = useSWR("/cart", shoppingCartService.get);

  const cartSubtotal = cartData?.subtotal || 0;
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

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    if (!promoCodeInput) {
      setAppliedPromo(null);
      sessionStorage.removeItem("appliedPromoCode");
      return;
    }
    try {
      const promo = await promotionService.public.getByCode(promoCodeInput);
      const promoData = promo.data || promo;

      const minPurchase = parseFloat(promoData.min_purchase || "0");
      if (cartSubtotal < minPurchase) {
        toast.error(
          `Minimum purchase to use this promo is ${priceFormatter(minPurchase)}`,
        );
        return;
      }

      setAppliedPromo(promoData);
      sessionStorage.setItem("appliedPromoCode", promoData.name);
      toast.success("Promo code applied!");
    } catch (err) {
      toast.error("Invalid or expired promo code");
      setAppliedPromo(null);
      sessionStorage.removeItem("appliedPromoCode");
    }
  };

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await shoppingCartService.updateItem(cartItemId, newQuantity);
      mutate();
    } catch (error) {
      toast.error(`Error updating quantity: ${error.message || error}`);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await shoppingCartService.removeItem(cartItemId);
      toast.success("Item removed from cart");
      mutate();
    } catch (error) {
      toast.error(`Error removing item: ${error.message || error}`);
    }
  };

  if (isLoading && !cartData) {
    return (
      <div className="w-full pb-20">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Cart" }]}
        />
        <div className="flex flex-col gap-10 mt-10">
          <div className="text-center py-20 font-medium text-gray-500">
            Loading cart...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />

      <div className="flex flex-col gap-10 mt-10">
        {/* Table Header */}
        <div className="shadow-sm rounded-sm bg-white grid grid-cols-[1.5fr_1fr_1fr_0.6fr] px-10 py-6 gap-4 font-medium items-center">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span className="text-right">Subtotal</span>
        </div>

        {/* Cart Items List */}
        <div className="flex flex-col gap-6">
          {!cartData.items || cartData.items?.length === 0 ? (
            <div className="text-center py-10 font-medium text-gray-500">
              Your cart is empty
            </div>
          ) : (
            cartData.items?.map((item) => (
              <div
                key={item.cart_item_id}
                className="shadow-sm rounded-sm bg-white grid grid-cols-[1.5fr_1fr_1fr_0.6fr] px-10 py-6 gap-4 items-center"
              >
                <div className="flex items-center gap-4 relative group">
                  <button
                    onClick={() => handleRemoveItem(item.cart_item_id)}
                    className="absolute -left-3 -top-3 bg-[#DB4444] text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110"
                  >
                    <XIcon size={14} />
                  </button>
                  <Link
                    to={`/product/${item.product_id}`}
                    className="shrink-0 w-14 h-14 relative"
                  >
                    <CartProductImage
                      productId={item.product_id}
                      alt={item.product_name}
                    />
                  </Link>
                  <Link
                    to={`/product/${item.product_id}`}
                    className="hover:text-[#DB4444] transition-colors line-clamp-2 pr-4 font-medium"
                  >
                    {item.product_name}
                  </Link>
                </div>

                <span>{priceFormatter(item.price)}</span>

                {/* Quantity Input */}
                <div>
                  <div className="inline-flex items-center rounded-sm border border-black/30 overflow-hidden bg-white h-11">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.cart_item_id,
                          item.quantity - 1,
                        )
                      }
                      disabled={item.quantity <= 1}
                      className="p-1 px-3 border-r border-black/30 hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-black disabled:hover:border-black/30 w-10 flex justify-center h-full items-center"
                    >
                      <MinusIcon size={16} />
                    </button>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val))
                          handleUpdateQuantity(item.cart_item_id, val);
                      }}
                      className="w-12 text-center text-base font-medium outline-none remove-arrow bg-transparent"
                      min={1}
                    />
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.cart_item_id,
                          item.quantity + 1,
                        )
                      }
                      className="p-1 px-3 border-l border-black/30 hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-colors w-10 flex justify-center h-full items-center"
                    >
                      <PlusIcon size={16} />
                    </button>
                  </div>
                </div>

                <span className="text-right font-medium">
                  {priceFormatter(item.subtotal)}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <Button variant="outlined" onClick={() => navigate("/")}>
            Return To Shop
          </Button>
        </div>

        {/* Cart Total & Coupon Section */}
        <div className="grid grid-cols-[1fr_470px] gap-[170px] mt-10">
          <form className="flex gap-4 items-start" onSubmit={handleApplyPromo}>
            <input
              type="text"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              placeholder="Coupon Code"
              className="border border-black flex-1 rounded-sm px-6 h-14 outline-none focus:border-[#DB4444] transition-colors"
            />
            <Button className="h-14 px-12 whitespace-nowrap">
              Apply Coupon
            </Button>
          </form>

          <div className="border border-black rounded-sm p-8 flex flex-col gap-6">
            <h3 className="font-medium text-xl w-full text-left">Cart Total</h3>
            <div className="flex justify-between border-b border-black/30 pb-4">
              <span>Subtotal:</span>
              <span>{priceFormatter(cartSubtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between border-b border-black/30 pb-4 text-[#DB4444]">
                <span>Discount ({appliedPromo.name}):</span>
                <span>-{priceFormatter(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-black/30 pb-4">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between pb-2 font-medium">
              <span>Total:</span>
              <span>{priceFormatter(finalTotal)}</span>
            </div>
            <div className="flex justify-center mt-2">
              <Link to="/cart/checkout" className="w-full">
                <Button className="w-full h-14 whitespace-nowrap font-medium text-base">
                  Process to checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
