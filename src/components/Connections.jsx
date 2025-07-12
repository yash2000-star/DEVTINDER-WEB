import axios from "axios"
import { BASE_URL } from "../utils/contants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/ConnectionsSlice";


const connections = () => {
    const connections = useSelector(store => store.connections);
    const dispatch = useDispatch();
const fetchConnections = async () => {
    try {

        const res = await axios.get(BASE_URL + "/user/connections", {
            withCredentials: true,
        });
        dispatch(addConnections(res.data.data))
    } catch (err) {
        // Handle error case
    }
};

useEffect(() => {
    fetchConnections();
}, []);

if(!connections) return;

if(connections.length === 0 ) return <h1> No Connections found</h1>


    return (
    <div className="text-center my-10">
        <h1 className="text-bold text-3xl text-white">Connections</h1>

        {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about} = connection;

            return (
            <div key={_id} className=" flex  m-4 p-4 border rounded-lg bg-base-300 w-1/2 mx-auto">
                <div><img alt="photo" className="w-20 h-20 rounded-full obj" src= {photoUrl}/></div>
                <div className="text-left mx-4">
                    <h2  className="font-bold text-xl">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " " + gender }</p>}
                <p>{about}</p>
                </div>   
            </div>
        )})}
    </div>
    );
}

export default connections;