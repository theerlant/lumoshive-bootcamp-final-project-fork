import { useLocation, useParams, Link } from "react-router-dom";
import { Breadcrumbs } from "../../../components/BreadCrumbs";
import { Button } from "../../../components/Button";
import { priceFormatter } from "../../../../shared/utils/priceFormatter";
import useSWR from "swr";
import { productService } from "../../../../shared/services/productService";

const OrderItem = ({ item }) => {
  const { data } = useSWR(
    item.product_id ? `/products/${item.product_id}` : null,
    () => productService.public.getById(item.product_id),
  );
  const imgUrl = data?.images?.[0]?.image_url;
  const productName = data?.name || data?.product_name || "Loading...";

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 shrink-0 bg-[#f5f5f5] flex items-center justify-center rounded-sm overflow-hidden">
          {imgUrl ? (
            <img
              src={`http://103.150.116.241:8082${imgUrl}`}
              alt={productName}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <span className="text-xs text-gray-400">img</span>
          )}
        </div>
        <span className="font-medium">{productName}</span>
      </div>
      <span className="font-medium shrink-0">
        {priceFormatter(item.subtotal)}
      </span>
    </div>
  );
};

export const CheckoutSuccessPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const orderData = location.state?.orderData;

  const subtotal =
    orderData?.items?.reduce((sum, item) => sum + item.subtotal, 0) ??
    orderData?.total ??
    0;
  const total = orderData?.total ?? subtotal;

  return (
    <div className="w-full pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <div className="max-w-lg mx-auto mt-16">
        <h1 className="text-4xl font-semibold mb-8 text-center">
          Order Success
        </h1>

        <div className="flex flex-col gap-6">
          {/* Items */}
          {orderData?.items?.map((item) => (
            <OrderItem key={item.product_id} item={item} />
          ))}

          {/* Totals */}
          <div className="flex flex-col gap-4 border-t border-black/10 pt-4 mt-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">{priceFormatter(subtotal)}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-4">
              <span>Shipping:</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-medium">{priceFormatter(total)}</span>
            </div>
          </div>

          {/* Payment Info */}
          {orderData?.payment_info?.bank_details && (
            <div className="bg-[#f5f5f5] rounded-sm p-5 flex flex-col gap-2 text-sm">
              <p className="font-medium mb-1">Bank Transfer Details</p>
              <div className="flex justify-between">
                <span className="text-gray-500">Bank:</span>
                <span className="font-medium">
                  {orderData.payment_info.bank_details.bank_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account No.:</span>
                <span className="font-medium">
                  {orderData.payment_info.bank_details.account_number}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account Name:</span>
                <span className="font-medium">
                  {orderData.payment_info.bank_details.account_name}
                </span>
              </div>
            </div>
          )}

          <Link to="/" className="self-stretch *:w-full">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
