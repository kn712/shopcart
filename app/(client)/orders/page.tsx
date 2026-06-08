import Container from "@/components/Container";
import NoAccess from "@/components/NoAccess";
import OrdersComponent from "@/components/OrdersComponent";
import Title from "@/components/Title";
import { getMyOrders } from "@/sanity/queries";
import { auth } from "@clerk/nextjs/server";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrdersPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <NoAccess />;
  }

  const orders = await getMyOrders(userId);

  return (
    <Container className="py-10">
      <div className="flex items-center gap-2 mb-6">
        <Title>Order History</Title>
      </div>
      {orders && orders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Invoice</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <OrdersComponent orders={orders} />
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
          <p className="text-lg font-semibold">No orders found</p>
          <p className="text-sm mt-1">
            You haven&apos;t placed any orders yet.
          </p>
        </div>
      )}
    </Container>
  );
};

export default OrdersPage;
