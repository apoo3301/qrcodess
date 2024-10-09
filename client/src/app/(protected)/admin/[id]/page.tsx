import { useRouter } from "next/navigation";

const CustomerPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <h1>Customer ID: {id}</h1>
    </div>
  );
};

export default CustomerPage;
