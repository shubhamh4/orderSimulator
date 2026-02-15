import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";
import ExecutionList from "../components/ExecutionList";

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <OrderForm />
      <OrderList />
      <ExecutionList />
    </div>
  );
}
