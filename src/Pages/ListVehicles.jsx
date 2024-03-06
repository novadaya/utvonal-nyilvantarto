import BackToHome from "../Components/BackToHome";
import DataFromDatabase from "../Components/DataFromDatabase";

export default function ListVehicles(){
    return (
        <div>
            <BackToHome/>
            <DataFromDatabase/>
        </div>
    );
}