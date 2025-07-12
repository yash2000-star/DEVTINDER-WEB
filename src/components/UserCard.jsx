const UserCard = ({ user }) => {
    const {firstName, lastName, photoUrl, age, gender, about  } = user;
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={user.photoUrl} alt="photo"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + " ," + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Intertested</button>
    </div>
  </div>
</div>
    )
}

export default UserCard