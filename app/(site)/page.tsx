import getUsers from "@/actions/users/getUsers";
import UserCard from "./UserCard";

export default async function Index() {
  const users = await getUsers();

  return (
    <>
      <h1 className="text-center text-2xl mt-8">Libraries</h1>
      <div className="flex flex-row flex-wrap gap-8 justify-center align-middle mt-4">
        {users.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </>
  );
}
