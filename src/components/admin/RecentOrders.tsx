interface Order {
  id: string;
  firstName: string;
  lastName: string;
  total: number;
  status: string;
  createdAt: Date;
}

interface RecentOrdersProps {
  orders: Order[];
}

export default function RecentOrders({
  orders,
}: RecentOrdersProps) {
  return (
    <div
      className="
        mt-10
        rounded-3xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2
        className="
          mb-6
          text-2xl
          font-semibold
        "
      >
        Recent Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className="
                border-b
                text-left
                text-sm
                text-neutral-500
              "
            >
              <th className="pb-4">
                Customer
              </th>

              <th className="pb-4">
                Total
              </th>

              <th className="pb-4">
                Status
              </th>

              <th className="pb-4">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b"
              >
                <td className="py-4">
                  {order.firstName}{" "}
                  {order.lastName}
                </td>

                <td className="py-4">
                  $
                  {order.total.toFixed(2)}
                </td>

                <td className="py-4">
                  <span
                    className="
                      rounded-full
                      bg-yellow-100
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-yellow-700
                    "
                  >
                    {order.status}
                  </span>
                </td>

                <td className="py-4">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="
                    py-10
                    text-center
                    text-neutral-500
                  "
                >
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}